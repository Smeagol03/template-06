import { useState, useEffect, useRef } from "react";
import Opening from "../components/Opening";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle scroll lock for invitation
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      const coupleSection = document.getElementById("couple");
      if (coupleSection) {
        coupleSection.scrollIntoView({ behavior: "smooth" });
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

      {/* Floating Elements - Conditional Visibility */}
      {isOpen && <FloatingNav />}

      {/* 1. Opening Section */}
      <section id="opening">
        <Opening onOpen={() => setIsOpen(true)} isOpen={isOpen} />
      </section>

      {/* 2. Couple Section */}
      <section id="couple">
        <Couple />
      </section>

      {/* 3. Love Story Section */}
      <section id="story">
        <LoveStory />
      </section>

      {/* 4. Event Details Section */}
      <section id="event" className="py-12 md:py-24">
        <EventDetails />
      </section>

      {/* 5. Countdown Timer Section */}
      <Countdown />

      {/* 6. Location & Maps Section */}
      <section id="location" className="py-12 md:py-24">
        <Location />
      </section>

      {/* 7. Live Streaming Section */}
      <LiveStreaming />

      {/* 8. Gallery Section */}
      <section id="gallery">
        <Gallery />
      </section>

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
