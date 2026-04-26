import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check, Gift } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

gsap.registerPlugin(ScrollTrigger);

const WeddingGift = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gift-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(WEDDING_DATA.links.weddingGift.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
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
        </div>

        {/* Bank Card with Double Bezel Architecture */}
        <div className="gift-card relative group max-w-md mx-auto">
          <div className="relative z-10 p-8 md:p-10 rounded-[2.5rem] bg-white/3 border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col items-center">
            {/* Bank Badge */}
            <div className="px-4 py-1.5 rounded-full bg-white text-black font-sans text-[10px] font-bold tracking-widest uppercase mb-8">
              {WEDDING_DATA.links.weddingGift.bank}
            </div>

            <div className="space-y-2 mb-10">
              <p className="font-sans text-2xl md:text-3xl text-white tracking-widest font-medium">
                {WEDDING_DATA.links.weddingGift.accountNumber}
              </p>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
                a.n {WEDDING_DATA.links.weddingGift.accountName}
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`group/btn relative flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500 overflow-hidden
                ${copied ? "bg-emerald-500 text-white" : "bg-white/5 text-white/70 hover:bg-white hover:text-black"}
              `}
            >
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase">
                {copied ? "Copied Successfully" : "Copy Number"}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                ${copied ? "bg-white/20" : "bg-white/10 group-hover/btn:bg-black/10"}
              `}
              >
                {copied ? (
                  <Check size={14} weight="bold" />
                ) : (
                  <Copy size={14} />
                )}
              </div>
            </button>
          </div>

          {/* Decorative Outer Shell */}
          <div className="absolute -inset-4 border border-white/5 rounded-[3rem] -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Small Note */}
        <p className="mt-12 font-serif italic text-white/20 text-sm">
          Terima kasih atas segala doa dan perhatiannya.
        </p>
      </div>
    </section>
  );
};

export default WeddingGift;
