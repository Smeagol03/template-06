import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapTrifold } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".map-container", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MapTrifold size={16} weight="light" className="text-white/60" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
              Location Map
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white italic">
            Find the Way
          </h2>
        </div>

        {/* Map Container with Double Bezel */}
        <div className="map-container relative group">
          <div className="relative z-10 w-full aspect-video md:aspect-21/9 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3944.292425687444!2d116.4861670738212!3d-8.663714688165115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMzknNDkuNCJTIDExNsKwMjknMTkuNSJF!5e0!3m2!1sen!2sid!4v1777169145253!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.2)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Location"
            />
            {/* Dark Overlay for Cinematic Feel (Pointer events none to allow map interaction) */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/20 to-transparent" />
          </div>

          {/* Outer Shell Effect */}
          <div className="absolute -inset-4 border border-white/5 rounded-[3rem] -z-10 opacity-50" />
        </div>

        {/* Action Button for Native Apps */}
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=-8.663714688165115,116.4861670738212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/70 font-sans text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 group"
          >
            Buka Map
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10">
              <MapTrifold size={14} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Location;
