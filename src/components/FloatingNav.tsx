import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Users,
  BookOpen,
  CalendarHeart,
  MapPin,
  Image as ImageIcon,
  ChatCenteredDots,
} from "@phosphor-icons/react";

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("opening");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { icon: House, target: "opening" },
    { icon: Users, target: "couple" },
    { icon: BookOpen, target: "story" },
    { icon: CalendarHeart, target: "event" },
    { icon: MapPin, target: "location" },
    { icon: ImageIcon, target: "gallery" },
    { icon: ChatCenteredDots, target: "rsvp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide/show on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section tracking
      const sections = navItems.map(item => item.target);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 md:bottom-8 left-1/2 z-[100] px-4 w-fit"
        >
          <nav className="flex items-center gap-1 md:gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.target;
              
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.target)}
                  className="relative flex items-center justify-center transition-all duration-300 rounded-full h-10 w-10 md:h-12 md:w-12 group"
                >
                  {/* Hover/Active Effect */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  <item.icon
                    size={isActive ? 20 : 18}
                    weight={isActive ? "fill" : "light"}
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-black" : "text-white/40 group-hover:text-white"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;

