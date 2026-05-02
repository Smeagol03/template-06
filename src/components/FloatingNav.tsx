import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Users,
  BookOpen,
  CalendarHeart,
  MapPin,
  Broadcast,
  Image as ImageIcon,
  ChatCenteredDots,
} from "@phosphor-icons/react";

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("opening");

  const navItems = [
    { icon: House, label: "Home", target: "opening" },
    { icon: Users, label: "Couple", target: "couple" },
    { icon: BookOpen, label: "Story", target: "story" },
    { icon: CalendarHeart, label: "Event", target: "event" },
    { icon: MapPin, label: "Maps", target: "location" },
    { icon: ImageIcon, label: "Gallery", target: "gallery" },
    { icon: ChatCenteredDots, label: "RSVP", target: "rsvp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.target);
      
      // Find current section with a more robust threshold
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold for mobile and pinning sections
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-fit pointer-events-none">
      <motion.nav
        layout
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.target;
          
          return (
            <button
              key={index}
              onClick={() => scrollToSection(item.target)}
              className={`relative flex items-center justify-center transition-all duration-500 rounded-full h-11 w-11
                ${isActive ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"}
              `}
            >
              <item.icon
                size={20}
                weight={isActive ? "fill" : "light"}
                className="transition-colors duration-500"
              />

              {/* Active Indicator Background (Shared Layout) */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 rounded-full bg-white z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};


export default FloatingNav;

