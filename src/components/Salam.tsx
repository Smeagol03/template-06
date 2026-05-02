import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";
import WeddingCake from "./WeddingCake";

const Salam = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  return (
    <section
      id="salam"
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden flex flex-col items-center text-center"
    >
      {/* Background Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* 2. Minimalist Self-Drawing Cake Component */}
      <WeddingCake isInView={isInView} />

      {/* 1. Greeting Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="py-16 md:py-24 relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-6xl text-white mb-8 leading-tight max-w-4xl mx-auto italic">
          Assalamu'alaikum Warahmatullahi Wabarakatuh
        </h2>
        <p className="text-white/50 font-sans text-xs md:text-sm tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed">
          With the grace of God, we invite you to celebrate the union of our
          souls
        </p>
      </motion.div>

      {/* 3. Photo - Double-Bezel Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-20 md:mb-32 group"
      >
        <div className="p-2 md:p-3 bg-white/5 rounded-[3rem] md:rounded-[4rem] border border-white/10 backdrop-blur-sm transition-transform duration-700 group-hover:scale-[1.01]">
          <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] w-[280px] h-[420px] md:w-[420px] md:h-[600px] bg-zinc-900 shadow-2xl">
            <img
              src={WEDDING_DATA.gallery[0].url}
              alt="Wedding Intro"
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Dark wash for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 z-0" />

            {/* Magical Sparkles Overlay */}
            <AnimatePresence>
              {isInView && (
                <>
                  {/* Sparkle 1: Top Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                      y: -40,
                      x: 15,
                      rotate: 180,
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
                    className="absolute top-[15%] right-[20%] text-white z-10 pointer-events-none"
                  >
                    <Sparkle
                      size={24}
                      weight="fill"
                      filter="drop-shadow(0 0 8px rgba(255,255,255,1))"
                    />
                  </motion.div>
                  {/* Sparkle 2: Bottom Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 5 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                      scale: [0, 1.1, 0],
                      y: -30,
                      x: -15,
                      rotate: -180,
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2.0 }}
                    className="absolute bottom-[20%] left-[25%] text-white z-10 pointer-events-none"
                  >
                    <Sparkle
                      size={18}
                      weight="fill"
                      filter="drop-shadow(0 0 6px rgba(255,255,255,0.9))"
                    />
                  </motion.div>
                  {/* Sparkle 3: Mid Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      y: -25,
                      rotate: 90,
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2.6 }}
                    className="absolute top-[45%] left-[15%] text-white z-10 pointer-events-none"
                  >
                    <Sparkle
                      size={14}
                      weight="fill"
                      filter="drop-shadow(0 0 5px rgba(255,255,255,0.8))"
                    />
                  </motion.div>
                  {/* Sparkle 4: Bottom Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 15 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.1, 0],
                      y: -35,
                      rotate: 120,
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 1.8 }}
                    className="absolute bottom-[35%] right-[15%] text-white z-10 pointer-events-none"
                  >
                    <Sparkle
                      size={20}
                      weight="fill"
                      filter="drop-shadow(0 0 8px rgba(255,255,255,0.9))"
                    />
                  </motion.div>
                  {/* Sparkle 5: Top Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                      scale: [0, 1, 0],
                      y: -45,
                      x: 5,
                      rotate: -90,
                    }}
                    transition={{ duration: 3.8, repeat: Infinity, delay: 2.4 }}
                    className="absolute top-[25%] left-[35%] text-white z-10 pointer-events-none"
                  >
                    <Sparkle
                      size={16}
                      weight="fill"
                      filter="drop-shadow(0 0 6px rgba(255,255,255,0.8))"
                    />
                  </motion.div>
                  {/* Sparkle 6: Mid Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 5 }}
                    animate={{
                      opacity: [0, 0.85, 0],
                      scale: [0, 1.1, 0],
                      y: -20,
                      x: -10,
                      rotate: 45,
                    }}
                    transition={{ duration: 4.2, repeat: Infinity, delay: 3.1 }}
                    className="absolute top-[55%] right-[30%] text-white z-10 pointer-events-none"
                  >
                    <Sparkle
                      size={18}
                      weight="fill"
                      filter="drop-shadow(0 0 6px rgba(255,255,255,0.9))"
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 4. Quote Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 2, delay: 1.8, ease: "easeOut" }}
        className="relative"
      >
        <p className="font-serif text-xl md:text-3xl text-white/40 max-w-3xl px-6 leading-relaxed italic">
          "{WEDDING_DATA.quotes.text}"
        </p>
        <div className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/20">
          — {WEDDING_DATA.quotes.author || "The Couple"}
        </div>
      </motion.div>
    </section>
  );
};

export default Salam;
