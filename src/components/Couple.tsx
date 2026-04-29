import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InstagramLogo, Heart } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const FloatingHeart = ({ i, scrollYProgress }: { i: number; scrollYProgress: any }) => {
  // Unique parallax speeds and rotations based on index
  const y = useTransform(scrollYProgress, [0, 1], [0, -(150 + i * 50)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? 45 : -45]);
  
  // Spring for "weighted" organic movement (no glitches)
  const smoothY = useSpring(y, { stiffness: 50, damping: 25 });

  // Stable "random" positions based on index to avoid hydration issues
  const positions = [
    { top: '10%', left: '5%' },
    { top: '25%', left: '85%' },
    { top: '45%', left: '12%' },
    { top: '15%', left: '70%' },
    { top: '65%', left: '5%' },
    { top: '80%', left: '75%' },
    { top: '35%', left: '40%' },
    { top: '55%', left: '88%' },
    { top: '75%', left: '15%' },
    { top: '90%', left: '60%' },
  ];

  return (
    <motion.div
      style={{
        y: smoothY,
        rotate,
        top: positions[i].top,
        left: positions[i].left,
        opacity: 0.06 + (i * 0.015),
      }}
      className={`absolute text-white pointer-events-none z-20 ${
        i % 3 === 0 ? "hidden md:block" : "block"
      }`}
    >
      <Heart size={20 + (i * 12)} weight="light" />
    </motion.div>
  );
};

const Couple = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative Floating Hearts - Framer Motion Parallax */}
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={i} i={i} scrollYProgress={scrollYProgress} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-32"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">
            Meet the Happy Couple
          </span>
          <h2 className="font-serif text-3xl md:text-6xl text-white">
            Groom <span className="italic font-light text-white/60">&</span> Bride
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
          {/* Groom Card */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <motion.div 
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="couple-card relative group mb-10 md:mb-8"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] w-[260px] h-[380px] md:w-[350px] md:h-[520px] transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={WEDDING_DATA.couple.groom.photo} 
                  alt={WEDDING_DATA.couple.groom.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
              <div className="absolute -inset-3 md:-inset-4 border border-white/5 rounded-[3rem] md:rounded-[3.5rem] -z-10" />
            </motion.div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4 px-4 md:px-0"
            >
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
            </motion.div>
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-32">
            <motion.div 
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="couple-card relative group mb-10 md:order-last md:mb-0 md:mt-8"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] w-[260px] h-[380px] md:w-[350px] md:h-[520px] transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src={WEDDING_DATA.couple.bride.photo} 
                  alt={WEDDING_DATA.couple.bride.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
              <div className="absolute -inset-3 md:-inset-4 border border-white/5 rounded-[3rem] md:rounded-[3.5rem] -z-10" />
            </motion.div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="space-y-4 px-4 md:px-0 md:mb-8"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Couple;
