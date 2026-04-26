import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InstagramLogo } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const Couple = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal animation for photos and text
      gsap.from(".couple-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.4,
        ease: "power4.out",
      });

      gsap.from(".couple-info", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32 couple-info">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">
            Meet the Happy Couple
          </span>
          <h2 className="font-serif text-3xl md:text-6xl text-white">
            Groom <span className="italic font-light text-white/60">&</span> Bride
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          {/* Groom Card */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="couple-card relative group mb-10 md:mb-8">
              <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] w-[260px] h-[380px] md:w-[350px] md:h-[520px] transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={WEDDING_DATA.couple.groom.photo} 
                  alt={WEDDING_DATA.couple.groom.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
              <div className="absolute -inset-3 md:-inset-4 border border-white/5 rounded-[3rem] md:rounded-[3.5rem] -z-10" />
            </div>
            
            <div className="couple-info space-y-4 px-4 md:px-0">
              <h3 className="font-serif text-2xl md:text-4xl text-white">
                {WEDDING_DATA.couple.groom.fullName}
              </h3>
              <p className="font-sans text-[11px] md:text-sm text-white/50 tracking-wider uppercase leading-relaxed max-w-[280px] md:max-w-none">
                {WEDDING_DATA.couple.groom.parentNames}
              </p>
              <a 
                href={`https://instagram.com/${WEDDING_DATA.couple.groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-widest text-white/30 hover:text-white transition-colors uppercase pt-2"
              >
                <InstagramLogo size={14} className="md:size-4" />
                {WEDDING_DATA.couple.groom.instagram}
              </a>
            </div>
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-32">
            <div className="couple-card relative group mb-10 md:order-last md:mb-0 md:mt-8">
              <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] w-[260px] h-[380px] md:w-[350px] md:h-[520px] transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={WEDDING_DATA.couple.bride.photo} 
                  alt={WEDDING_DATA.couple.bride.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
              <div className="absolute -inset-3 md:-inset-4 border border-white/5 rounded-[3rem] md:rounded-[3.5rem] -z-10" />
            </div>
            
            <div className="couple-info space-y-4 px-4 md:px-0 md:mb-8">
              <h3 className="font-serif text-2xl md:text-4xl text-white">
                {WEDDING_DATA.couple.bride.fullName}
              </h3>
              <p className="font-sans text-[11px] md:text-sm text-white/50 tracking-wider uppercase leading-relaxed max-w-[280px] md:max-w-none">
                {WEDDING_DATA.couple.bride.parentNames}
              </p>
              <a 
                href={`https://instagram.com/${WEDDING_DATA.couple.bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-widest text-white/30 hover:text-white transition-colors uppercase pt-2"
              >
                <InstagramLogo size={14} className="md:size-4" />
                {WEDDING_DATA.couple.bride.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;
