import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CalendarBlank,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const EventDetails = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const TimelineItem = ({
    title,
    data,
    index,
  }: {
    title: string;
    data: any;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.3 }}
      className="relative pl-12 md:pl-20 pb-16 last:pb-0"
    >
      {/* Timeline Node */}
      <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 bg-zinc-900 flex items-center justify-center z-10">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-24">
        {/* Time & Title */}
        <div className="md:w-64 shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={16} weight="fill" className="text-white/60" />
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-white underline underline-offset-8 decoration-white/20">
              Pukul {data.time}
            </span>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl text-white leading-none">
            {title}
          </h3>
        </div>

        {/* Location Details */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <p className="font-sans text-lg md:text-xl text-white/90 mb-2 font-medium">
                {data.venue}
              </p>
              <p className="text-xs md:text-sm text-white/40 leading-relaxed tracking-wide uppercase">
                {data.address}
              </p>
            </div>
          </div>

          <a
            href={data.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.3em] text-white/50 hover:text-white transition-colors uppercase py-2 border-b border-white/10 hover:border-white/40"
          >
            Petunjuk Lokasi (Google Maps)
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="event"
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 md:mb-40"
        >
          <div className="max-w-3xl">
            <h2 className="font-serif text-center text-5xl md:text-8xl text-white leading-[0.9] tracking-tight">
              Agenda <br />{" "}
              <span className="italic text-white/30">Pernikahan</span>
            </h2>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4">
              <CalendarBlank
                size={24}
                weight="light"
                className="text-white/40"
              />
              <p className="font-serif text-lg md:text-3xl text-white/90 italic">
                {WEDDING_DATA.event.dateFormatted}
              </p>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">
              Urutan Waktu Acara
            </p>
          </div>
        </motion.div>

        {/* Unified Itinerary Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[15px] md:left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-white/20 via-white/20 to-transparent" />

          <div className="space-y-4">
            <TimelineItem
              title="Akad Nikah"
              data={WEDDING_DATA.event.akad}
              index={0}
            />
            <TimelineItem
              title="Resepsi"
              data={WEDDING_DATA.event.resepsi}
              index={1}
            />
          </div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-40 md:mt-64 text-center max-w-3xl mx-auto"
        >
          <p className="font-serif italic text-xl md:text-3xl text-white/40 leading-relaxed mb-10">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya..."
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/20">
              Ar-Rum 21
            </span>
            <div className="w-8 h-px bg-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
