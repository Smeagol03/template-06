import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapTrifold, Compass, MapPin } from "@phosphor-icons/react";

const FloatingIcon = ({ i, scrollYProgress }: { i: number; scrollYProgress: any }) => {
  const Icons = [Compass, MapPin, MapTrifold];
  const Icon = Icons[i % Icons.length];
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -(100 + i * 30)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? 20 : -20]);
  const smoothY = useSpring(y, { stiffness: 45, damping: 25 });

  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', left: '85%' },
    { top: '70%', left: '10%' },
    { top: '80%', left: '80%' },
  ];

  return (
    <motion.div
      style={{
        y: smoothY,
        rotate,
        top: positions[i % positions.length].top,
        left: positions[i % positions.length].left,
        opacity: 0.05 + (i * 0.01),
      }}
      className="absolute text-white pointer-events-none z-20"
    >
      <Icon size={30 + (i * 15)} weight="light" />
    </motion.div>
  );
};

const Location = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative Floating Icons */}
      {[...Array(4)].map((_, i) => (
        <FloatingIcon key={i} i={i} scrollYProgress={scrollYProgress} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MapTrifold size={16} weight="light" className="text-white/60" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
              Location Map
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-6xl text-white italic">
            Find the Way
          </h2>
        </motion.div>

        {/* Map Container with Double Bezel */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="map-container relative group"
        >
          <div className="relative z-10 w-full aspect-video md:aspect-21/9 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3944.292425687444!2d116.4861670738212!3d-8.663714688165115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMzknNDkuNCJTIDExNsKwMjknMTkuNSJF!5e0!3m2!1sen!2sid!4v1777169145253!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.1) grayscale(0.2)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Location"
            />
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Outer Shell Effect */}
          <div className="absolute -inset-4 md:-inset-6 border border-white/5 rounded-[3rem] md:rounded-[5rem] -z-10 opacity-50" />
        </motion.div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 md:mt-20 text-center"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=-8.663714688165115,116.4861670738212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white/70 font-sans text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 group"
          >
            Buka Map
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <MapTrifold size={16} />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
