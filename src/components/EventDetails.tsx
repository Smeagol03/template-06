import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Clock, CalendarBlank, Heart, Sparkle } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";
import kananAtas from "../assets/dekoratif/kanan-atas.png";

const FallingParticle = ({ i }: { i: number }) => {
  // Random horizontal position and size
  const left = `${(i * 13.7) % 100}%`;
  const size = i % 3 === 0 ? '3px' : '1.5px';
  
  // Random duration and delay for organic feel
  const duration = 15 + (i % 10);
  const delay = -(i * 2); // Start at different positions in the cycle

  return (
    <motion.div
      initial={{ y: "-10vh", opacity: 0 }}
      animate={{ 
        y: "110vh",
        opacity: [0, 0.4, 0.4, 0],
        x: [0, i % 2 === 0 ? 20 : -20, 0] // Subtle horizontal sway
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

const EventDetails = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep scroll progress for other elements if needed, but particles are now independent
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const EventCard = ({
    title,
    data,
    iconColor,
    index,
  }: {
    title: string;
    data: any;
    iconColor: string;
    index: number;
  }) => (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="event-card group relative h-full"
    >
      {/* Double Bezel Architecture */}
      <div className="relative z-10 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden h-full flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
        {/* Subtle Inner Highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <h3 className="font-serif text-2xl md:text-4xl text-white mb-6 md:mb-8 italic">
          {title}
        </h3>

        <div className="space-y-6 md:space-y-8 flex-grow">
          <div className="flex gap-4">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/5 text-${iconColor}`}
            >
              <Clock size={18} className="md:size-5" weight="light" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                Time
              </p>
              <p className="text-white font-sans text-sm md:text-base tracking-wide">
                {data.time}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/5 text-${iconColor}`}
            >
              <MapPin size={18} className="md:size-5" weight="light" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
                Venue
              </p>
              <p className="text-white font-sans text-sm md:text-base tracking-wide mb-1 md:mb-2">
                {data.venue}
              </p>
              <p className="text-[11px] md:text-xs text-white/50 leading-relaxed max-w-[250px]">
                {data.address}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={data.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 md:mt-12 inline-flex items-center justify-between w-full px-5 py-4 rounded-full bg-white text-black font-sans text-xs md:text-sm font-medium transition-all duration-300 hover:bg-white/90 group/btn"
        >
          <span>View on Google Maps</span>
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/5 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
            <MapPin size={14} className="md:size-4" weight="fill" />
          </div>
        </a>
      </div>

      {/* Outer Glow/Shadow Shell */}
      <div className="absolute -inset-2 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] md:rounded-[3rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Falling Star Particles */}
      {[...Array(25)].map((_, i) => (
        <FallingParticle key={i} i={i} />
      ))}

      {/* Decorative Floral Corners */}
      <img
        src={kananAtas}
        alt="deco"
        className="absolute top-0 right-0 w-28 md:w-80 opacity-20 pointer-events-none z-0"
      />
      <img
        src={kananAtas}
        alt="deco"
        className="absolute top-0 left-0 w-28 md:w-80 opacity-20 pointer-events-none z-0 -scale-x-100"
      />
      <img
        src={kananAtas}
        alt="deco"
        className="absolute bottom-0 right-0 w-28 md:w-80 opacity-20 pointer-events-none z-0 -scale-y-100"
      />
      <img
        src={kananAtas}
        alt="deco"
        className="absolute bottom-0 left-0 w-28 md:w-80 opacity-20 pointer-events-none z-0 -scale-x-100 -scale-y-100"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div className="max-w-2xl">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 mb-4 block">
              The Celebration
            </span>
            <h2 className="font-serif text-3xl md:text-7xl text-white leading-tight">
              Event <br className="hidden md:block" /> Details
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6 pb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center">
              <CalendarBlank
                size={18}
                className="md:size-5 text-white"
                weight="light"
              />
            </div>
            <div className="h-[1px] w-8 md:w-12 bg-white/20" />
            <p className="font-sans text-base md:text-xl text-white/80 tracking-widest uppercase italic">
              {WEDDING_DATA.event.dateFormatted}
            </p>
          </div>
        </motion.div>

        {/* Central Couple Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-24 md:mb-32"
        >
          <div className="relative mx-auto w-full max-w-4xl aspect-[16/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 group">
            <img
              src={WEDDING_DATA.gallery[1].url}
              alt="Couple"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-6">
              <Heart
                size={24}
                weight="fill"
                className="text-white/40 mx-auto mb-4"
              />
              <p className="font-serif text-xl md:text-3xl text-white italic tracking-wide">
                Save the Date for Our Big Day
              </p>
            </div>
          </div>
          {/* Decorative frame elements */}
          <div className="absolute -inset-4 md:-inset-6 border border-white/5 rounded-[3rem] md:rounded-[5rem] -z-10" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <EventCard
            title="Holy Matrimony"
            data={WEDDING_DATA.event.akad}
            iconColor="white"
            index={0}
          />
          <EventCard
            title="Wedding Reception"
            data={WEDDING_DATA.event.resepsi}
            iconColor="white"
            index={1}
          />
        </div>

        {/* Bottom Banner/Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-16 md:mt-24 p-6 md:p-8 rounded-[2rem] md:rounded-4xl border border-white/5 bg-white/[0.01] text-center max-w-3xl mx-auto"
        >
          <p className="font-serif italic text-base md:text-lg text-white/40 leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya..."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
