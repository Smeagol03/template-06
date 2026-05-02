import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowsOutSimple } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";
import BgGallery from "../assets/dekoratif/latar.webp";

const Gallery = ({ id }: { id?: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id={id}
      className="relative overflow-hidden py-24 md:py-48"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url(${BgGallery})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10">
        {/* Header Block */}
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">
              Visual Memories
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-8xl text-white leading-none">
            Our <span className="italic text-white/30">Gallery</span>
          </h2>
        </div>

        {/* Manual Horizontal Scroll Container */}
        <div className="relative w-full overflow-x-auto overflow-y-hidden no-scrollbar">
          <div className="flex gap-6 md:gap-12 px-6 md:px-[10vw] pb-12">
            {WEDDING_DATA.gallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative shrink-0 group pointer-events-none"
                onClick={() => setSelectedImage(item.url)}
              >
                {/* Double-Bezel Architecture */}
                <div className="p-2 md:p-3 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 backdrop-blur-sm transition-all duration-700 group-hover:bg-white/10">
                  <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.2rem] bg-zinc-900 aspect-[4/5] md:aspect-[3/4] h-[50vh] md:h-[65vh]">
                    <img
                      src={item.url}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                        <ArrowsOutSimple size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-6 px-4 flex items-center justify-between opacity-40">
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="w-8 h-px bg-white/20" />
                </div>
              </motion.div>
            ))}

            {/* End Space */}
            <div className="shrink-0 w-[5vw] md:w-[10vw]" />
          </div>
        </div>

        {/* Hint for Scroll */}
        <div className="max-w-7xl mx-auto px-6 mt-8 flex justify-end">
          <div className="flex items-center gap-4 text-white/20">
            <span className="text-[9px] uppercase tracking-[0.3em]">
              Swipe to explore
            </span>
            <div className="w-12 h-px bg-white/10" />
          </div>
        </div>
      </div>

      {/* Premium Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white z-[210] hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} weight="light" />
            </motion.button>

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
                className="max-w-full max-h-full object-contain rounded-2xl md:rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
