import { motion } from "framer-motion";
import { Heart, Calendar, Sparkle, ChatCircleText } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const LoveStory = () => {
  return (
    <section className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Abstract Background Light */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">
              Our Chronicles
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-8xl text-white leading-none">
            Love <span className="italic text-white/30">Story</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Card 1: Large (The First Meeting) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 group"
          >
            <div className="p-2 md:p-3 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 backdrop-blur-sm h-full flex flex-col">
              <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.2rem] bg-zinc-900 aspect-[16/9] mb-8">
                <img 
                  src="https://picsum.photos/seed/story1/1200/800" 
                  alt={WEDDING_DATA.stories[0].title} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} />
                    {WEDDING_DATA.stories[0].year}
                  </div>
                </div>
              </div>
              <div className="px-6 md:px-10 pb-10">
                <div className="flex items-center gap-3 text-white/30 mb-4">
                  <ChatCircleText size={20} weight="light" />
                  <span className="text-[10px] uppercase tracking-widest font-mono">Archive 01</span>
                </div>
                <h3 className="font-serif text-3xl md:text-5xl text-white mb-6">
                  {WEDDING_DATA.stories[0].title}
                </h3>
                <p className="font-sans text-white/50 leading-relaxed max-w-2xl text-lg">
                  {WEDDING_DATA.stories[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Small Square (Stats/Quote) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <div className="p-10 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 backdrop-blur-sm h-full flex flex-col justify-between items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Heart size={32} weight="light" className="text-white/40" />
              </div>
              <div>
                <span className="text-4xl md:text-6xl font-serif text-white block mb-2">2,000+</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Days Together</span>
              </div>
              <p className="font-serif italic text-white/40 text-lg">
                "And so the adventure begins..."
              </p>
            </div>
          </motion.div>

          {/* Card 3: Medium (Building Dreams) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 group"
          >
            <div className="p-2 md:p-3 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 backdrop-blur-sm h-full flex flex-col">
              <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.2rem] bg-zinc-900 aspect-square mb-8">
                <img 
                  src="https://picsum.photos/seed/story2/800/800" 
                  alt={WEDDING_DATA.stories[1].title} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute top-6 right-6">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white uppercase tracking-widest">
                    {WEDDING_DATA.stories[1].year}
                  </div>
                </div>
              </div>
              <div className="px-6 md:px-10 pb-10">
                <h3 className="font-serif text-2xl md:text-4xl text-white mb-4">
                  {WEDDING_DATA.stories[1].title}
                </h3>
                <p className="font-sans text-sm text-white/50 leading-relaxed">
                  {WEDDING_DATA.stories[1].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Medium (The Proposal) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 group"
          >
            <div className="p-2 md:p-3 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 backdrop-blur-sm h-full flex flex-col">
              <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.2rem] bg-zinc-900 flex-1 min-h-[300px]">
                <img 
                  src="https://picsum.photos/seed/story3/1200/600" 
                  alt={WEDDING_DATA.stories[2].title} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                   <div className="flex items-center gap-3 text-white/40 mb-4">
                    <Sparkle size={20} weight="light" />
                    <span className="text-[10px] uppercase tracking-widest font-mono">Archive 03 — {WEDDING_DATA.stories[2].year}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-5xl text-white mb-6">
                    {WEDDING_DATA.stories[2].title}
                  </h3>
                  <p className="font-sans text-white/60 leading-relaxed max-w-xl">
                    {WEDDING_DATA.stories[2].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LoveStory;

