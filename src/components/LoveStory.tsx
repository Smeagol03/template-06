import { motion } from "framer-motion";
import { WEDDING_DATA } from "../constants/data";

const LoveStory = () => {
  return (
    <section id="story" className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Abstract Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 md:mb-40"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6 block">
            Our Journey
          </span>
          <h2 className="font-serif text-5xl md:text-8xl text-white leading-none">
            Love <span className="italic text-white/30">Story</span>
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Line Connector */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-24 md:space-y-40">
            {WEDDING_DATA.stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-white border-4 border-[#0a0a0a] z-10 -translate-x-1/2" />

                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${
                  index % 2 === 0 
                    ? "pl-12 md:pl-24 md:pr-0" 
                    : "pl-12 md:pl-0 md:pr-24"
                }`}>
                  <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"}`}>
                    <span className="font-mono text-[10px] md:text-xs text-white/30 tracking-[0.3em] mb-4">
                      {story.year}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                      {story.title}
                    </h3>
                    <p className="font-sans text-white/50 leading-relaxed text-sm md:text-base max-w-md">
                      {story.description}
                    </p>
                  </div>
                </div>

                {/* Empty Side (for Desktop Balance) */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Journey Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-32 md:mt-48 text-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mb-8" />
          <p className="font-serif italic text-xl md:text-2xl text-white/20">
            And the best is yet to come
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveStory;
