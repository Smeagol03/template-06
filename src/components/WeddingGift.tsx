import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Copy, Check, Gift, Bank, Coins, CreditCard } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const FloatingIcon = ({ i, scrollYProgress }: { i: number; scrollYProgress: any }) => {
  const Icons = [Gift, Bank, Coins, CreditCard];
  const Icon = Icons[i % Icons.length];
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -(100 + i * 30)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, i % 2 === 0 ? 25 : -25]);
  const smoothY = useSpring(y, { stiffness: 45, damping: 25 });

  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', left: '85%' },
    { top: '75%', left: '10%' },
    { top: '85%', left: '80%' },
  ];

  return (
    <motion.div
      style={{
        y: smoothY,
        rotate,
        top: positions[i % positions.length].top,
        left: positions[i % positions.length].left,
        opacity: 0.05 + (i * 0.01),
      }}
      className="absolute text-white pointer-events-none z-20"
    >
      <Icon size={30 + (i * 15)} weight="light" />
    </motion.div>
  );
};

const WeddingGift = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(WEDDING_DATA.links.weddingGift.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-48 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative Floating Icons */}
      {[...Array(4)].map((_, i) => (
        <FloatingIcon key={i} i={i} scrollYProgress={scrollYProgress} />
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <Gift
            size={32}
            weight="thin"
            className="text-white/30 mx-auto mb-6"
          />
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 mb-4 block">
            Digital Envelope
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            Wedding Gift
          </h2>
          <p className="font-sans text-sm md:text-base text-white/40 max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda
            ingin memberikan tanda kasih, Anda dapat memberikannya melalui
            dompet digital berikut:
          </p>
        </motion.div>

        {/* Bank Card with Double Bezel Architecture */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="gift-card relative group max-w-md mx-auto"
        >
          <div className="relative z-10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col items-center">
            {/* Subtle Inner Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Bank Badge */}
            <div className="px-5 py-2 rounded-full bg-white text-black font-sans text-[10px] font-bold tracking-[0.2em] uppercase mb-10">
              {WEDDING_DATA.links.weddingGift.bank}
            </div>

            <div className="space-y-3 mb-12">
              <p className="font-sans text-2xl md:text-4xl text-white tracking-widest font-medium">
                {WEDDING_DATA.links.weddingGift.accountNumber}
              </p>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
                a.n {WEDDING_DATA.links.weddingGift.accountName}
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`group/btn relative flex items-center gap-4 px-10 py-5 rounded-full transition-all duration-500 overflow-hidden
                ${copied ? "bg-emerald-500 text-white" : "bg-white text-black hover:bg-white/90"}
              `}
            >
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                {copied ? "Copied Successfully" : "Copy Number"}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
                ${copied ? "bg-white/20" : "bg-black/5 group-hover/btn:scale-110"}
              `}
              >
                {copied ? (
                  <Check size={16} weight="bold" />
                ) : (
                  <Copy size={16} />
                )}
              </div>
            </button>
          </div>

          {/* Decorative Outer Shell */}
          <div className="absolute -inset-4 border border-white/5 rounded-[3.5rem] -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>

        {/* Small Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 font-serif italic text-white/20 text-base"
        >
          Terima kasih atas segala doa dan perhatiannya.
        </motion.p>
      </div>
    </section>
  );
};

export default WeddingGift;
