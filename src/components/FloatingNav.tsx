import { motion } from "framer-motion";
import { House, Users, BookOpen, CalendarHeart, MapPin, Image, ChatCenteredDots } from "@phosphor-icons/react";

const FloatingNav = () => {
  const navItems = [
    { icon: House, label: "Home", target: "opening" },
    { icon: Users, label: "Couple", target: "couple" },
    { icon: BookOpen, label: "Story", target: "story" },
    { icon: CalendarHeart, label: "Event", target: "event" },
    { icon: MapPin, label: "Maps", target: "location" },
    { icon: Image, label: "Gallery", target: "gallery" },
    { icon: ChatCenteredDots, label: "RSVP", target: "rsvp" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-fit">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        className="flex items-center gap-1 p-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.target)}
            className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-white/40 hover:text-white transition-all duration-300"
          >
            <item.icon size={20} weight="light" className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Tooltip Label */}
            <span className="absolute -top-12 px-3 py-1.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100">
              {item.label}
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
            </span>

            {/* Hover Background */}
            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </motion.nav>
    </div>
  );
};

export default FloatingNav;
