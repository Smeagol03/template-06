import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "../constants/data";

const FallingParticle = ({ i }: { i: number }) => {
  const left = `${(i * 13.7) % 100}%`;
  const size = i % 3 === 0 ? '3px' : '1.5px';
  const duration = 15 + (i % 10);
  const delay = -(i * 2);

  return (
    <motion.div
      initial={{ y: "-10vh", opacity: 0 }}
      animate={{ 
        y: "110vh",
        opacity: [0, 0.4, 0.4, 0],
        x: [0, i % 2 === 0 ? 20 : -20, 0]
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: "linear",
      }}
      className="absolute pointer-events-none z-0"
      style={{ left }}
    >
      <div 
        className="bg-white rounded-full blur-[0.5px]" 
        style={{ width: size, height: size }} 
      />
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

  const containerRef = useRef<HTMLDivElement>(null);

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

  const TimeUnit = ({ value, label, showDivider = true, index }: { value: number; label: string; showDivider?: boolean, index: number }) => (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="countdown-item flex items-center gap-2 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="font-serif text-3xl sm:text-4xl md:text-8xl text-white leading-none mb-2 md:mb-4 tracking-tighter">
          {value.toString().padStart(2, '0')}
        </div>
        <span className="font-sans text-[8px] md:text-xs uppercase tracking-[0.3em] text-white/30">
          {label}
        </span>
      </div>
      {showDivider && (
        <div className="font-serif text-xl md:text-6xl text-white/10 self-start mt-1 md:mt-4">:</div>
      )}
    </motion.div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Falling Star Particles Backdrop */}
      {[...Array(30)].map((_, i) => (
        <FallingParticle key={i} i={i} />
      ))}

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/30">
            Counting Down to
          </span>
          <div className="h-px w-8 bg-white/20 mx-auto mt-4" />
        </motion.div>
        
        <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-12">
          <TimeUnit value={timeLeft.days} label="Days" index={0} />
          <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
          <TimeUnit value={timeLeft.minutes} label="Mins" index={2} />
          <TimeUnit value={timeLeft.seconds} label="Secs" showDivider={false} index={3} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="font-serif italic text-base md:text-xl text-white/20">
            The beginning of our forever
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
