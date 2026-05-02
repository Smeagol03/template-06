import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";

interface WeddingCakeProps {
  isInView: boolean;
}

const WeddingCake = ({ isInView }: WeddingCakeProps) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Halo / Ripple Effect (Welcoming 'Hello/Halo' Effect) */}
      <AnimatePresence>
        {isInView && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.5, 2] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 1,
                ease: "easeOut",
              }}
              className="absolute w-full h-full rounded-full border border-white/20 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.15, 0], scale: [0.5, 1.2, 1.8] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: 2.5,
                ease: "easeOut",
              }}
              className="absolute w-full h-full rounded-full border border-white/10 pointer-events-none"
            />
            {/* Ambient Inner Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute w-1/2 h-1/2 rounded-full bg-white blur-[60px] pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cake-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Cake Stand */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
          d="M30 170 Q100 185 170 170"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          x1="100"
          y1="177"
          x2="100"
          y2="195"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          x1="70"
          y1="195"
          x2="130"
          y2="195"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />

        {/* Layer 1 (Bottom) */}
        <motion.rect
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, fillOpacity: 1 }
              : { pathLength: 0, fillOpacity: 0 }
          }
          transition={{
            pathLength: { duration: 1.5, delay: 0.8, ease: "easeInOut" },
            fillOpacity: { duration: 1.5, delay: 1.8, ease: "easeIn" },
          }}
          x="45"
          y="130"
          width="110"
          height="40"
          rx="6"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.9"
          fill="url(#cake-gradient)"
        />

        {/* Layer 2 (Middle) */}
        <motion.rect
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, fillOpacity: 1 }
              : { pathLength: 0, fillOpacity: 0 }
          }
          transition={{
            pathLength: { duration: 1.5, delay: 1.2, ease: "easeInOut" },
            fillOpacity: { duration: 1.5, delay: 2.2, ease: "easeIn" },
          }}
          x="60"
          y="95"
          width="80"
          height="35"
          rx="5"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.9"
          fill="url(#cake-gradient)"
        />

        {/* Layer 3 (Top) */}
        <motion.rect
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, fillOpacity: 1 }
              : { pathLength: 0, fillOpacity: 0 }
          }
          transition={{
            pathLength: { duration: 1.5, delay: 1.6, ease: "easeInOut" },
            fillOpacity: { duration: 1.5, delay: 2.6, ease: "easeIn" },
          }}
          x="75"
          y="65"
          width="50"
          height="30"
          rx="4"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.9"
          fill="url(#cake-gradient)"
        />

        {/* Candle */}
        <motion.line
          initial={{ pathLength: 0, opacity: 0, y: 10 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1, y: 0 }
              : { pathLength: 0, opacity: 0, y: 10 }
          }
          transition={{ duration: 0.8, delay: 2.5, type: "spring" }}
          x1="100"
          y1="65"
          x2="100"
          y2="45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Flame Base Glow */}
        <motion.path
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.8,
            delay: 2.8,
            type: "spring",
            bounce: 0.4,
          }}
          style={{ originX: "100px", originY: "45px" }}
          d="M100 30C100 30 104 38 104 41C104 44 102 46 100 46C98 46 96 44 96 41C96 38 100 30 100 30Z"
          fill="#ffdf80"
          filter="url(#glow)"
        />
      </svg>

      {/* Floating Sparkles around the cake */}
      <AnimatePresence>
        {isInView && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0, 1, 0],
                y: -30,
                x: 10,
                rotate: 180,
              }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 2.8 }}
              className="absolute top-10 right-1/4 text-yellow-100"
            >
              <Sparkle
                size={24}
                weight="fill"
                filter="drop-shadow(0 0 6px rgba(255,223,128,0.8))"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 5 }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
                y: -20,
                x: -10,
                rotate: -180,
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 3.5 }}
              className="absolute bottom-1/3 left-1/4 text-white"
            >
              <Sparkle
                size={16}
                weight="fill"
                filter="drop-shadow(0 0 4px rgba(255,255,255,0.8))"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: -25,
                rotate: 90,
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 4.2 }}
              className="absolute top-1/4 left-[30%] text-yellow-50"
            >
              <Sparkle size={12} weight="fill" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingCake;
