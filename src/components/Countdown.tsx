import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const MagicalSparkle = ({ index }: { index: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 3 + Math.random() * 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0],
        y: [0, -40],
        rotate: [0, 180],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none text-white/40"
      style={{ left: `${randomX}%`, top: `${randomY}%` }}
    >
      <Sparkle size={index % 2 === 0 ? 12 : 20} weight="fill" />
    </motion.div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.event.countdownTarget).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({
    value,
    label,
    index,
  }: {
    value: number;
    label: string;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: 0.2 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col items-center px-2 sm:px-4 md:px-8"
    >
      <span className="font-serif text-3xl sm:text-4xl md:text-8xl text-white tracking-tighter leading-none mb-4">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="font-sans text-[8px] sm:text-[9px] md:text-xs uppercase tracking-[0.4em] text-white/30 font-medium">
        {label}
      </span>
    </motion.div>
  );

  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center py-32 px-8 sm:px-12 bg-[#0a0a0a] overflow-hidden">
      {/* 1. Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      {/* 2. Magical Sparkles Layer */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <MagicalSparkle key={i} index={i} />
        ))}
      </div>

      {/* 3. The Journey Path (Stunning SVG Animation) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 500,0 C 500,200 100,300 100,500 C 100,700 900,800 900,1000"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        <motion.path
          d="M 500,0 C 500,200 900,300 900,500 C 900,700 100,800 100,1000"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* 4. Central Rotating Ring */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-8 block font-sans">
              Save The Date
            </span>
            <div className="h-px w-12 bg-white/20 mx-auto mb-12" />
          </motion.div>

          {/* Time Units Grid */}
          <div className="flex items-center justify-center">
            <TimeUnit value={timeLeft.days} label="Days" index={0} />
            <div className="w-px h-12 md:h-20 bg-white/10" />
            <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
            <div className="w-px h-12 md:h-20 bg-white/10" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
            <div className="w-px h-12 md:h-20 bg-white/10" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-serif italic text-xl md:text-3xl text-white/30 tracking-wide text-center">
            {WEDDING_DATA.event.dateFormatted}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Sparkle
              size={14}
              className="text-white/20 animate-pulse"
              weight="fill"
            />
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-mono">
              The Journey of Us
            </span>
            <Sparkle
              size={14}
              className="text-white/20 animate-pulse"
              weight="fill"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
