import { useState, useEffect, useRef } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle scroll lock for invitation
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
