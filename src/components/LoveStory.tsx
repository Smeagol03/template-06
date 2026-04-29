import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Heart, Flower, FlowerTulip, Leaf } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const FloatingDecoration = ({ i, scrollYProgress }: { i: number; scrollYProgress: any }) => {
  // Diverse icons for a natural look
  const Icons = [Flower, FlowerTulip, Leaf];
  const Icon = Icons[i % Icons.length];
  
  // Unique parallax and rotation
  const y = useTransform(scrollYProgress, [0, 1], [0, -(200 + i * 40)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? 90 : -90]);
  
  // Spring for premium inertia
  const smoothY = useSpring(y, { stiffness: 40, damping: 20 });

  const positions = [
    { top: '5%', left: '8%' },
    { top: '15%', left: '80%' },
    { top: '30%', left: '5%' },
    { top: '40%', left: '90%' },
    { top: '55%', left: '10%' },
    { top: '70%', left: '85%' },
    { top: '85%', left: '4%' },
    { top: '95%', left: '75%' },
    { top: '20%', left: '45%' },
    { top: '65%', left: '40%' },
    { top: '50%', left: '82%' },
    { top: '10%', left: '25%' },
  ];

  return (
    <motion.div
      style={{
        y: smoothY,
        rotate,
        top: positions[i % positions.length].top,
        left: positions[i % positions.length].left,
        opacity: 0.04 + (i * 0.01),
      }}
      className={`absolute text-white pointer-events-none z-20 ${
        i % 4 === 0 ? "hidden md:block" : "block"
      }`}
    >
      <Icon size={25 + (i * 10)} weight="light" />
    </motion.div>
  );
};

const LoveStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <FloatingDecoration key={i} i={i} scrollYProgress={scrollYProgress} />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
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
        </motion.div>

        {/* Story Timeline */}
        <div className="space-y-0">
          {WEDDING_DATA.stories.map((story, index) => (
            <div
              key={index}
              className="story-item relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16 pb-24 md:pb-32 last:pb-0"
            >
              {/* Side A: Year & Image */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-6 ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left md:order-last'}`}
              >
                <span className="font-serif text-5xl md:text-7xl text-white/10 italic">
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
              </motion.div>

              {/* Central Line & Dot */}
              <div className="relative hidden md:flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-2 h-2 rounded-full bg-white/40 mb-4" 
                />
                {index !== WEDDING_DATA.stories.length - 1 && (
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                    className="w-px h-full bg-gradient-to-b from-white/40 to-transparent" 
                  />
                )}
              </div>

              {/* Side B: Content */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col justify-center px-2 md:px-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right md:order-first'}`}
              >
                <h3 className="font-serif text-2xl md:text-4xl text-white mb-4 md:mb-6">
                  {story.title}
                </h3>
                <p className="font-sans text-sm md:text-lg text-white/50 leading-relaxed max-w-md">
                  {story.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
