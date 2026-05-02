import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoCamera, Broadcast } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const LiveStreaming = ({ id }: { id?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stream-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 bg-[#0a0a0a]"
    >

      <div className="max-w-5xl mx-auto">
        <div className="stream-card relative group">
          {/* Main Container */}
          <div className="relative z-10 p-8 md:p-16 rounded-[3rem] bg-white/2 border border-white/10 backdrop-blur-md overflow-hidden flex flex-col items-center text-center">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold">
                Live Stream
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              Virtual Celebration
            </h2>

            <p className="font-sans text-sm md:text-base text-white/60 max-w-lg mb-12 leading-relaxed">
              Bagi keluarga dan kerabat yang berhalangan hadir secara fisik,
              kami mengundang Anda untuk menyaksikan momen bahagia kami melalui
              siaran langsung.
            </p>

            {/* Virtual "Screen" Preview */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/5 bg-black/40 group-hover:border-white/20 transition-colors duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoCamera
                  size={48}
                  weight="thin"
                  className="text-white/10 group-hover:text-white/30 transition-colors duration-500"
                />
              </div>
              {/* Overlay with radial wash */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </div>

            {/* CTA Button */}
            <a
              href={WEDDING_DATA.links.liveStreaming}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black font-sans text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Broadcast
                size={20}
                weight="bold"
                className="group-hover/btn:animate-pulse"
              />
              Join Live
              {/* Magnetic shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-black/5 to-transparent skew-x-12" />
            </a>
          </div>

          {/* Decorative Glow Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[120px] rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
};

export default LiveStreaming;
