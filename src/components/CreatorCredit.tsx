import { Globe, WhatsappLogo } from "@phosphor-icons/react";
import { WEDDING_DATA } from "../constants/data";

const CreatorCredit = () => {
  const waUrl = `https://wa.me/${WEDDING_DATA.creator.phone}?text=${encodeURIComponent(WEDDING_DATA.creator.whatsappMessage)}`;

  return (
    <footer className="relative py-12 px-6 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Logo/Brand Name */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Crafted by</span>
          <h4 className="font-serif text-xl md:text-2xl text-white/60 tracking-wider">
            {WEDDING_DATA.creator.name}
          </h4>
          <p className="font-serif italic text-sm text-white/30 mt-2">
            Mau buat undangan seperti ini?
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <a 
            href={WEDDING_DATA.creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
          >
            <Globe size={16} weight="light" className="group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Portfolio</span>
          </a>

          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 group"
          >
            <WhatsappLogo size={16} weight="fill" className="group-hover:scale-110 transition-transform duration-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">WhatsApp Me</span>
          </a>
        </div>

        {/* Decorative underline */}
        <div className="w-12 h-px bg-white/10" />

        {/* Copyright or Year */}
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/10 text-center leading-loose">
          All Rights Reserved &copy; 2026 • Premium Digital Invitation
        </p>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </footer>
  );
};

export default CreatorCredit;
