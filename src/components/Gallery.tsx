import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { X, ArrowsOutSimple, Camera, Image as ImageIcon, Aperture } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const FloatingIcon = ({ i, scrollYProgress }: { i: number; scrollYProgress: any }) => {
  const Icons = [Camera, ImageIcon, Aperture];
  const Icon = Icons[i % Icons.length];
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -(150 + i * 40)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? 45 : -45]);
  const smoothY = useSpring(y, { stiffness: 40, damping: 25 });

  const positions = [
    { top: '5%', left: '10%' },
    { top: '15%', left: '85%' },
    { top: '65%', left: '5%' },
    { top: '85%', left: '90%' },
    { top: '45%', left: '45%' },
    { top: '25%', left: '15%' },
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
      <Icon size={25 + (i * 15)} weight="light" />
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
      {[...Array(6)].map((_, i) => (
        <FloatingIcon key={i} i={i} scrollYProgress={scrollYProgress} />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4 block">
            Visual Memories
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-white">
            Our Gallery
          </h2>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4 md:gap-8 grid-flow-dense">
          {WEDDING_DATA.gallery.map((item, index) => {
            const isPortrait = item.type === "portrait";
            const isLandscape = item.type === "landscape";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`gallery-item relative group cursor-pointer overflow-hidden rounded-[2.5rem] md:rounded-[3rem] 
                  ${isPortrait ? "row-span-2" : "row-span-1"}
                  ${isLandscape ? "md:col-span-2 col-span-2" : "col-span-1"}
                `}
                onClick={() => setSelectedImage(item.url)}
                whileHover={{ scale: 0.98 }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-white/5 border border-white/10">
                  <img
                    src={item.url}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                      <ArrowsOutSimple size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Premium Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white z-110 hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} weight="light" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
