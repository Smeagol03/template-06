import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicNote, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import Opening from "../components/Opening";
import Salam from "../components/Salam";
import Couple from "../components/Couple";
import LoveStory from "../components/LoveStory";
import EventDetails from "../components/EventDetails";
import Countdown from "../components/Countdown";
import Location from "../components/Location";
import LiveStreaming from "../components/LiveStreaming";
import Gallery from "../components/Gallery";
import WeddingGift from "../components/WeddingGift";
import RSVP from "../components/RSVP";
import Wishes from "../components/Wishes";
import Moments from "../components/Moments";
import Protocol from "../components/Protocol";
import Closing from "../components/Closing";
import CreatorCredit from "../components/CreatorCredit";
import FloatingNav from "../components/FloatingNav";
import { WEDDING_DATA } from "../constants/data";

const Invitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle scroll lock for invitation
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setIsPlaying(true);
      const salamSection = document.getElementById("salam");
      if (salamSection) {
        salamSection.scrollIntoView({ behavior: "smooth" });
      }
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <main className="relative overflow-x-hidden w-full max-w-full bg-[#0a0a0a]">
      {/* Texture Overlay (Fixed) */}
      <div className="film-grain" />

      {/* Background Music */}
      <audio ref={audioRef} src={WEDDING_DATA.musicUrl} loop />

      {/* Floating Music Controller */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-6 right-6 z-[110] flex items-center gap-3 pointer-events-none"
          >
            <div className="flex flex-col items-end gap-1">
              <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2 overflow-hidden max-w-[150px] md:max-w-[200px]">
                <MusicNote size={12} weight="fill" className="text-white/60 shrink-0" />
                <div className="relative overflow-hidden whitespace-nowrap">
                  <motion.p 
                    animate={{ x: [0, -100, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-[9px] uppercase tracking-widest text-white/80 font-sans"
                  >
                    {WEDDING_DATA.musicTitle}
                  </motion.p>
                </div>
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
            >
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                {isPlaying ? (
                  <SpeakerHigh size={18} weight="light" />
                ) : (
                  <SpeakerSlash size={18} weight="light" />
                )}
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements - Conditional Visibility */}
      {isOpen && <FloatingNav />}

      {/* 1. Opening Section */}
      <Opening onOpen={() => setIsOpen(true)} isOpen={isOpen} />

      {/* Salam Section */}
      {isOpen && <Salam />}

      {/* 2. Couple Section */}
      <Couple />

      {/* 3. Love Story Section */}
      <LoveStory />

      {/* 4. Event Details Section */}
      <EventDetails />

      {/* 5. Countdown Timer Section */}
      <Countdown />

      {/* 6. Location & Maps Section */}
      <Location id="location" />

      {/* 7. Live Streaming Section */}
      <LiveStreaming id="streaming" />

      {/* 8. Gallery Section */}
      <Gallery id="gallery" />


      {/* 9. Wedding Gift Section */}
      <WeddingGift />

      {/* 10. RSVP Section */}
      <section id="rsvp">
        <RSVP />
      </section>

      {/* 11. Guest Wishes Section */}
      <Wishes />

      {/* 12. Our Moments Section */}
      <Moments />

      {/* 13. Protocol Section */}
      <Protocol />

      {/* 14. Closing Section */}
      <Closing />

      {/* Creator Credit Section */}
      <CreatorCredit />
    </main>
  );
};

export default Invitation;
