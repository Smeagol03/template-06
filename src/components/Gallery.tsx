import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowsOutSimple } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
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
        {/* Header Block */}
        <div className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-4 block">
            Visual Memories
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-white">
            Our Gallery
          </h2>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4 md:gap-6 grid-flow-dense">
          {WEDDING_DATA.gallery.map((item, index) => {
            // Logic to determine span based on type
            const isPortrait = item.type === "portrait";
            const isLandscape = item.type === "landscape";

            return (
              <motion.div
                key={index}
                className={`gallery-item relative group cursor-pointer overflow-hidden rounded-4xl 
                  ${isPortrait ? "row-span-2" : "row-span-1"}
                  ${isLandscape ? "md:col-span-2 col-span-2" : "col-span-1"}
                `}
                onClick={() => setSelectedImage(item.url)}
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Image Container with Double Bezel Architecture */}
                <div className="relative w-full h-full overflow-hidden rounded-4xl bg-white/5">
                  <img
                    src={item.url}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ArrowsOutSimple size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Inner Highlight Hairline */}
                  <div className="absolute inset-0 rounded-4xl border border-white/10 pointer-events-none z-10" />
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white z-110 hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
