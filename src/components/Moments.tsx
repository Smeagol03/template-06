import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const Moments = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (textRef.current) {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        opacity: 0.1,
        scale: 0.95,
        y: 50,
        ease: "none",
      });
    }

    // Floating animation for ambient elements
    gsap.to(".floating-shape", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center px-6 bg-[#0a0a0a] overflow-hidden py-32"
    >
      {/* Background Image using Couple Photo from WEDDING_DATA */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale transition-all duration-1000"
        style={{ 
          backgroundImage: `url('${WEDDING_DATA.couple.bride.photo}')`,
          filter: "brightness(0.3) contrast(1.1)"
        }}
      />
      
      {/* Dark Radial Overlay to ensure text readability */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Ambient Shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/[0.02] blur-[100px] rounded-full floating-shape z-[2]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.01] blur-[120px] rounded-full floating-shape z-[2]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 
          ref={textRef}
          className="font-serif text-3xl md:text-6xl text-white leading-[1.4] italic"
        >
          "{WEDDING_DATA.quotes.text}"
        </h2>
        
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
          <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-medium">
            — {WEDDING_DATA.quotes.author}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Moments;
