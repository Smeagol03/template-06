import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";
import { WEDDING_DATA } from "../constants/data";

const Salam = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // 1. Greeting Animation
      tl.from(".salam-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Cake SVG Layers Animation (Earlier now)
      tl.from(".cake-layer-1", { y: 50, opacity: 0, duration: 0.6, ease: "back.out" }, "-=0.2");
      tl.from(".cake-layer-2", { y: 40, opacity: 0, duration: 0.6, ease: "back.out" }, "-=0.4");
      tl.from(".cake-layer-3", { y: 30, opacity: 0, duration: 0.6, ease: "back.out" }, "-=0.4");
      
      // 3. Candle and Flame
      tl.from(".candle", { scaleY: 0, transformOrigin: "bottom", duration: 0.4 }, "-=0.2");
      tl.from(".flame", { 
        scale: 0, 
        opacity: 0,
        transformOrigin: "center bottom",
        duration: 0.3, 
        ease: "back.out(2)",
        onComplete: () => {
          // Trigger confetti exactly when flame appears
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.5 },
            colors: ["#ffffff", "#f5f5f5", "#d4d4d4", "#a3a3a3"],
          });
        }
      });

      // 4. Photo Animation (Reveals last at the bottom)
      tl.from(".salam-photo", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      }, "+=0.2");
    },
    { scope: containerRef }
  );

  return (
    <section 
      id="salam"
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden flex flex-col items-center text-center"
    >
      {/* 1. Greeting */}
      <div className="salam-text mb-12">
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 italic">
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </h2>
        <p className="text-white/60 font-sans text-xs md:text-sm tracking-[0.3em] uppercase">
          Kami mengundang Anda untuk merayakan kebahagiaan kami
        </p>
      </div>

      {/* 2. Animated SVG Cake (Now above the photo) */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 mb-16">
        <svg 
          ref={cakeRef}
          viewBox="0 0 200 200" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1 (Bottom) */}
          <rect className="cake-layer-1" x="40" y="140" width="120" height="40" rx="10" fill="white" fillOpacity="0.1" />
          <rect className="cake-layer-1" x="45" y="145" width="110" height="30" rx="5" stroke="white" strokeOpacity="0.2" />
          
          {/* Layer 2 (Middle) */}
          <rect className="cake-layer-2" x="60" y="100" width="80" height="35" rx="8" fill="white" fillOpacity="0.15" />
          <rect className="cake-layer-2" x="65" y="105" width="70" height="25" rx="4" stroke="white" strokeOpacity="0.3" />

          {/* Layer 3 (Top) */}
          <rect className="cake-layer-3" x="80" y="70" width="40" height="25" rx="6" fill="white" fillOpacity="0.2" />
          
          {/* Candle */}
          <rect className="candle" x="97" y="50" width="6" height="20" rx="2" fill="white" fillOpacity="0.4" />
          
          {/* Flame */}
          <path 
            className="flame"
            d="M100 35C100 35 105 42 105 45C105 48 103 50 100 50C97 50 95 48 95 45C95 42 100 35 100 35Z" 
            fill="#FFD700"
          />
        </svg>
      </div>

      {/* 3. Photo (Now below the cake) */}
      <div className="salam-photo relative mb-16 md:mb-24 group">
        <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] w-[280px] h-[400px] md:w-[400px] md:h-[550px] transition-transform duration-700 group-hover:scale-[1.01]">
          <img 
            src={WEDDING_DATA.gallery[0].url} 
            alt="Wedding Intro"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        </div>
        <div className="absolute -inset-4 border border-white/5 rounded-[3.5rem] -z-10" />
      </div>

      <div className="mt-8">
        <p className="font-serif text-lg md:text-2xl text-white/80 max-w-2xl px-4 leading-relaxed italic">
          "{WEDDING_DATA.quotes.text}"
        </p>
      </div>
    </section>
  );
};

export default Salam;
