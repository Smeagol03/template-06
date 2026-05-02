import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CalendarBlank, Heart, ArrowUpRight } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const EventDetails = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const EventCard = ({
    title,
    data,
    index,
  }: {
    title: string;
    data: any;
    index: number;
  }) => (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="group relative h-full"
    >
      {/* DOUBLE-BEZEL ARCHITECTURE */}
      {/* 1. Outer Shell */}
      <div className="p-2 md:p-3 bg-white/5 rounded-[3rem] md:rounded-[4rem] border border-white/10 backdrop-blur-md shadow-2xl h-full transition-all duration-700 group-hover:scale-[1.01] group-hover:bg-white/10">
        
        {/* 2. Inner Core */}
        <div className="relative h-full p-8 md:p-12 rounded-[calc(3rem-0.5rem)] md:rounded-[calc(4rem-0.75rem)] bg-zinc-950/40 border border-white/5 overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Inner Highlight (Machined Edge effect) */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Heart size={20} weight="light" className="text-white/60" />
              </div>
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Archive 0{index + 1}</span>
            </div>

            <h3 className="font-serif text-3xl md:text-5xl text-white mb-10 leading-none">
              {title}<span className="text-white/20 italic">.</span>
            </h3>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Clock size={24} weight="light" className="text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Timing</p>
                  <p className="text-white font-sans text-lg md:text-xl tracking-tight leading-none italic">
                    {data.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <MapPin size={24} weight="light" className="text-white/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Location</p>
                  <p className="text-white font-sans text-lg md:text-xl tracking-tight leading-none mb-4">
                    {data.venue}
                  </p>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed max-w-[280px]">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BUTTON-IN-BUTTON CTA */}
          <a
            href={data.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 group/btn relative inline-flex items-center justify-between pl-8 pr-2 py-2 rounded-full bg-white text-black transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">Get Directions</span>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center transition-transform duration-500 group-hover/btn:rotate-45">
              <ArrowUpRight size={20} weight="bold" className="text-white" />
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient Radial Gradients */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">
                The Celebration
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl text-white leading-[0.9]">
              Wedding <br /> <span className="italic text-white/30">Itinerary</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
             <div className="px-4 py-2 rounded-full border border-white/20 flex items-center gap-3">
              <CalendarBlank size={16} className="text-white/60" />
              <p className="font-mono text-xs text-white/80 tracking-widest uppercase">
                {WEDDING_DATA.event.dateFormatted}
              </p>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Save the date for our big day</p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <EventCard
            title="Holy Matrimony"
            data={WEDDING_DATA.event.akad}
            index={0}
          />
          <EventCard
            title="Wedding Reception"
            data={WEDDING_DATA.event.resepsi}
            index={1}
          />
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-32 md:mt-48 text-center max-w-4xl mx-auto"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto mb-12" />
          <p className="font-serif italic text-xl md:text-3xl text-white/40 leading-relaxed">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya..."
          </p>
          <div className="mt-8 text-[10px] uppercase tracking-[0.5em] text-white/20">Ar-Rum 21</div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;

