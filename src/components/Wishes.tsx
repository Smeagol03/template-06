import { useState, useEffect, useRef } from "react";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
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

  // Initial Fetch: Last 50 messages
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      const wishesRef = query(
        ref(db, "demo/responses"),
        orderByChild("timestamp"),
        limitToLast(50),
      );

      try {
        const snapshot = await get(wishesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const wishlist = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .sort((a, b) => b.timestamp - a.timestamp); // Manual sort to be safe

          setWishes(wishlist);
          if (wishlist.length < 50) setHasMore(false);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching initial wishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore || wishes.length === 0) return;

    setLoadingMore(true);
    const oldestTimestamp = wishes[wishes.length - 1].timestamp;

    // Fetch next 20 older messages
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
      setLoadingMore(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // If we are 50px from the bottom, load more
    if (scrollHeight - scrollTop <= clientHeight + 50) {
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
            {/* Scrollable Container */}
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
                          <span className="text-[10px] text-emerald-500/60 uppercase tracking-tighter">
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

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 border-2 border-white/5 border-t-white/40 rounded-full animate-spin" />
                </div>
              )}

              {/* End of data message */}
              {!hasMore && wishes.length > 0 && (
                <div className="text-center py-10 opacity-20">
                  <p className="font-serif italic text-sm">
                    You've reached the end of the wishes.
                  </p>
                </div>
              )}
            </div>

            {/* Gradient Overlay */}
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
