import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const LoveStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".story-item");

      items.forEach((item: any) => {
        const texts = item.querySelectorAll(".reveal-text");
        const image = item.querySelector(".story-image");

        // Animate elements only if they exist
        if (texts.length > 0 || image) {
          gsap.fromTo(
            [...Array.from(texts), image].filter(Boolean),
            { 
              y: 50, 
              opacity: 0, 
              scale: 0.98 
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              stagger: 0.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Animate the timeline line
        const line = item.querySelector(".story-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-32">
          <Heart
            size={32}
            weight="thin"
            className="text-white/30 mx-auto mb-6"
          />
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-4 block">
            Our Journey
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            Love Story
          </h2>
        </div>

        {/* Story Timeline */}
        <div className="space-y-0">
          {WEDDING_DATA.stories.map((story, index) => (
            <div
              key={index}
              className="story-item relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16 pb-24 md:pb-32 last:pb-0"
            >
              {/* Side A: Year & Image */}
              <div className={`flex flex-col gap-6 ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left md:order-last'}`}>
                <span className="reveal-text font-serif text-5xl md:text-7xl text-white/10 italic">
                  {story.year}
                </span>
                
                <div className="story-image relative w-full aspect-[4/3] md:w-80 rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 group">
                  <img 
                    src={`https://picsum.photos/seed/wedding-story-${index}/800/600`} 
                    alt={story.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>
              </div>

              {/* Central Line & Dot */}
              <div className="relative hidden md:flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-white/40 mb-4" />
                {index !== WEDDING_DATA.stories.length - 1 && (
                  <div className="story-line w-px h-full bg-gradient-to-b from-white/40 to-transparent" />
                )}
              </div>

              {/* Side B: Content */}
              <div className={`flex flex-col justify-center px-2 md:px-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right md:order-first'}`}>
                <h3 className="reveal-text font-serif text-2xl md:text-4xl text-white mb-4 md:mb-6">
                  {story.title}
                </h3>
                <p className="reveal-text font-sans text-sm md:text-lg text-white/50 leading-relaxed max-w-md">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
