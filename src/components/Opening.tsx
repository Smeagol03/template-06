import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

interface OpeningProps {
  onOpen: () => void;
  isOpen: boolean;
}

const Opening = ({ onOpen, isOpen }: OpeningProps) => {
  const [searchParams] = useSearchParams();
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");

  useEffect(() => {
    const to = searchParams.get("to");
    if (to) {
      setGuestName(to);
    }
  }, [searchParams]);

  // Framer Motion staggered animation variants
  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp: Variants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="opening" className="relative h-screen min-h-[600px] w-full flex flex-col justify-between p-8 pb-24 md:p-16 overflow-hidden bg-[#0a0a0a]">
      {/* Background Photo Layer */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "linear" }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src={WEDDING_DATA.gallery[0]?.url || WEDDING_DATA.couple.bride.photo}
          alt="The Couple"
          className="w-full h-full object-cover object-center"
        />
        {/* Minimalist Gradient: Darkens only the very top and bottom edges for text contrast, leaving the center pristine */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </motion.div>

      {/* Top Header - Swiss Left Aligned */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <motion.span
          variants={fadeInUp}
          className="block text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/70 mb-4 font-sans font-medium"
        >
          The Wedding Celebration
        </motion.span>
        <motion.h1
          variants={fadeInUp}
          className="font-serif text-6xl md:text-8xl text-white leading-[0.9] tracking-tight"
        >
          {WEDDING_DATA.couple.groom.name.split(" ")[0]}
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          <span className="italic font-light text-white/50">&</span>
          <span className="md:hidden"> </span>
          <br className="hidden md:block" />
          {WEDDING_DATA.couple.bride.name.split(" ")[0]}
        </motion.h1>
      </motion.div>

      {/* Bottom Footer - Softened & Mobile Friendly */}
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-8 mb-4 md:mb-0"
      >
        {/* Guest Info & Date Container */}
        <div className="flex flex-row items-end justify-between md:justify-start md:gap-24 w-full md:w-auto">
          {/* Guest Name */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            <motion.span
              variants={fadeInUp}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/50 font-sans"
            >
              Reserved For
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-2xl md:text-4xl text-white font-light"
            >
              {guestName}
            </motion.h2>
          </div>

          {/* Date Info (Visible on mobile as well, smaller) */}
          <div className="hidden md:flex flex-col gap-1.5 md:gap-2 text-right md:text-left">
            <motion.span
              variants={fadeInUp}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/50 font-sans"
            >
              Date
            </motion.span>
            <motion.p
              variants={fadeInUp}
              className="font-sans text-[11px] md:text-sm tracking-widest text-white uppercase"
            >
              {WEDDING_DATA.event.dateFormatted}
            </motion.p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto flex mt-2 md:mt-0">
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                variants={fadeInUp}
                exit={{ opacity: 0, y: 20 }}
                onClick={onOpen}
                className="group w-full md:w-auto relative flex items-center justify-between md:justify-center gap-8 px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white transition-all duration-500 hover:bg-white hover:text-black active:scale-95 rounded-4xl"
              >
                <span className="font-sans text-[10px] md:text-xs font-light tracking-[0.25em] uppercase">
                  Buka Undangan
                </span>
                <ArrowRight
                  size={16}
                  weight="light"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Opening;
