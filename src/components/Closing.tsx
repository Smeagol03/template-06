import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const Closing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Zoom in effect for background photo
      gsap.fromTo(
        ".closing-bg",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      );

      // Text animations
      gsap.from(".closing-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-6 overflow-hidden bg-black"
    >
      {/* Colorful Background Photo */}
      <div
        className="closing-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${WEDDING_DATA.couple.groom.photo}')`,
          filter: "brightness(0.7) contrast(1.1)",
        }}
      />

      {/* Vibrant Gradient Overlays */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0 z-1 bg-linear-to-tr from-rose-900/40 via-transparent to-amber-900/40 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="closing-text mb-8">
          <Heart
            size={48}
            weight="fill"
            className="text-rose-500 mx-auto animate-pulse"
          />
        </div>

        <h2 className="closing-text font-serif text-4xl md:text-7xl text-white leading-tight mb-12 italic">
          Thank you for being part of our beautiful journey.
        </h2>

        <p className="closing-text font-sans text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-16 tracking-wide">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami
          berdua.
        </p>

        <div className="closing-text space-y-4">
          <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/50">
            With Love,
          </p>
          <h3 className="font-serif text-3xl md:text-5xl text-white">
            {WEDDING_DATA.couple.groom.name.split(" ")[0]} &{" "}
            {WEDDING_DATA.couple.bride.name.split(" ")[0]}
          </h3>
        </div>

        {/* Small footer credit */}
        <div className="mt-32 opacity-20">
          <p className="text-[10px] tracking-widest uppercase">
            Created with love • 2026
          </p>
        </div>
      </div>

      {/* Decorative light leaks */}
      <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-rose-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Closing;
