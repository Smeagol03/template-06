import { useState, useEffect, useRef } from "react";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  onValue,
  get,
  endAt,
} from "firebase/database";
import { db } from "../lib/firebase";
import { Quotes } from "@phosphor-icons/react";

const Wishes = () => {
  const [wishes, setWishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Track the timestamp of the oldest message in the initial real-time batch
  const oldestInBatchRef = useRef<number | null>(null);

  // Real-time Listener: Always keep the last 50 messages updated
  useEffect(() => {
    setLoading(true);
    const latestQuery = query(
      ref(db, "demo/responses"),
      orderByChild("timestamp"),
      limitToLast(50),
    );

    const unsubscribe = onValue(latestQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const latestBatch = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setWishes((prevWishes) => {
          // If we haven't loaded more yet, just use the latest batch
          if (prevWishes.length <= 50) {
            return latestBatch;
          }
          
          // If we have "loaded more" items, we only want to update the "top" part of the list
          // and keep the older items we already fetched via pagination
          const olderItems = prevWishes.filter(
            pw => !latestBatch.find(lb => lb.id === pw.id) && pw.timestamp < latestBatch[latestBatch.length - 1].timestamp
          );
          return [...latestBatch, ...olderItems];
        });

        if (latestBatch.length > 0) {
          oldestInBatchRef.current = latestBatch[latestBatch.length - 1].timestamp;
        }
        if (latestBatch.length < 50) setHasMore(false);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore || wishes.length === 0) return;

    setLoadingMore(true);
    const oldestTimestamp = wishes[wishes.length - 1].timestamp;

    // Fetch next 20 older messages (one-time fetch is fine for history)
    const moreRef = query(
      ref(db, "demo/responses"),
      orderByChild("timestamp"),
      endAt(oldestTimestamp - 1),
      limitToLast(20),
    );

    try {
      const snapshot = await get(moreRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const nextBatch = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setWishes((prev) => [...prev, ...nextBatch]);
        if (nextBatch.length < 20) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more wishes:", error);
    } finally {
      setLoadingMore(true); // Small hack to show indicator briefly
      setTimeout(() => setLoadingMore(false), 500);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMore();
    }
  };

  return (
    <section className="relative pb-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Quotes
            size={32}
            weight="thin"
            className="text-white/30 mx-auto mb-6"
          />
          <h2 className="font-serif text-3xl md:text-5xl text-white italic mb-4">
            Guest Wishes
          </h2>
          <p className="font-sans text-xs tracking-[0.3em] text-white/40 uppercase">
            Messages from Loved Ones
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="max-h-150 overflow-y-auto pr-4 custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="wish-card group relative p-6 rounded-4xl bg-white/2 border border-white/5 hover:border-white/20 transition-all duration-500"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">
                          {wish.name ? wish.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <h4 className="text-white font-sans text-sm font-medium leading-none mb-1">
                            {wish.name || "Anonymous"}
                          </h4>
                          <span className={`text-[10px] uppercase tracking-tighter ${wish.status === 'hadir' ? 'text-emerald-500/60' : 'text-white/20'}`}>
                            {wish.status === "hadir"
                              ? "Attending"
                              : "Sent Wishes"}
                          </span>
                        </div>
                      </div>

                      <p className="text-white/60 font-sans text-sm italic leading-relaxed grow">
                        "{wish.message || "Selamat menempuh hidup baru!"}"
                      </p>

                      <div className="mt-4 pt-4 border-t border-white/5">
                        <span className="text-[9px] text-white/20 uppercase tracking-widest">
                          {wish.timestamp
                            ? new Date(wish.timestamp).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {loadingMore && (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
                </div>
              )}

              {!hasMore && wishes.length > 0 && (
                <div className="text-center py-10 opacity-20 border-t border-white/5">
                  <p className="font-serif italic text-sm">
                    You've reached the end of the wishes.
                  </p>
                </div>
              )}
            </div>

            {hasMore && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            )}
          </div>
        )}

        {wishes.length === 0 && !loading && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-white/20 font-serif italic">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishes;
