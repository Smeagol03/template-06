import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnvelopeOpen } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

interface OpeningProps {
  onOpen: () => void;
  isOpen: boolean;
}

const Opening = ({ onOpen, isOpen }: OpeningProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");

  useEffect(() => {
    const to = searchParams.get("to");
    if (to) {
      setGuestName(to);
    }
  }, [searchParams]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Hero Text reveal
      tl.fromTo(
        ".hero-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, stagger: 0.2, delay: 0.5 },
      );

      // Background Ken-Burns Effect
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.05,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-between py-16 md:py-24 px-6 text-center overflow-hidden"
    >
      {/* Background Layer - Optimized for maximum photo visibility */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('${WEDDING_DATA.couple.bride.photo}')`,
          filter: "brightness(0.75) contrast(1.05)",
        }}
      />

      {/* Very subtle gradient to keep photo clean */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Top Header: Names */}
      <div className="relative z-10 hero-text opacity-0">
        <span className="block text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-white/50 mb-3">
          The Wedding Celebration Of
        </span>
        <h1 className="font-serif text-3xl md:text-6xl text-white tracking-widest font-light leading-none">
          {WEDDING_DATA.couple.groom.name.split(' ')[0]} <span className="italic font-light text-white/60">&</span> {WEDDING_DATA.couple.bride.name.split(' ')[0]}
        </h1>
      </div>

      {/* Bottom Footer: Guest Name & Button & Date */}
      <div className="relative z-10 w-full flex flex-col items-center gap-8 md:gap-10 hero-text opacity-0">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 italic">Dear,</span>
          <h2 className="font-serif text-xl md:text-3xl text-white tracking-wide">
            {guestName}
          </h2>
        </div>

        {!isOpen && (
          <button 
            onClick={onOpen}
            className="group/btn relative inline-flex items-center gap-4 px-12 py-4 rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
          >
            <EnvelopeOpen size={18} weight="light" className="transition-transform group-hover/btn:-rotate-12" />
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase">Buka Undangan</span>
          </button>
        )}

        <div className="flex flex-col items-center gap-4">
          <div className="h-px w-8 bg-white/20" />
          <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-white/60 uppercase">
            {WEDDING_DATA.event.dateFormatted}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Opening;
