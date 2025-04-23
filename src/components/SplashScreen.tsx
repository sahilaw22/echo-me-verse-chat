
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoFull } from "@/assets/logo";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 550); // Exit animation longer for smoother
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Fun dots background
  const dots = Array.from({ length: 16 });
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-bl from-[#eeebfa] via-[#e6faff] to-[#ffe7fa] z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating gradient dots */}
          <div className="absolute inset-0 pointer-events-none">
            {dots.map((_, i) => (
              <motion.div
                key={"dot" + i}
                className="absolute rounded-full"
                style={{
                  width: 44 - (i % 3) * 18,
                  height: 44 - (i % 3) * 18,
                  left: `${6 + (i % 4) * 22}%`,
                  top: `${4 + Math.floor(i / 4) * 25}%`,
                  background: "linear-gradient(135deg,#B993FE44,#FFD6F966,#82D1F833)",
                  filter: "blur(3px)",
                  opacity: 0.32 + (i % 3) * 0.15
                }}
                animate={{
                  y: [0, -14 + (i % 3) * 8, 0],
                  opacity: [0.2, 0.5, 0.25 + 0.08 * (i % 3)],
                }}
                transition={{
                  duration: 2 + (i % 2) * 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.08
                }}
              />
            ))}
          </div>
          {/* Big logo with sliding in animation */}
          <motion.div
            className="relative z-10 mb-8"
            initial={{ scale: 0.8, opacity: 0, y: 45 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0 
            }}
            transition={{
              duration: 1.12,
              type: "spring",
              stiffness: 64,
              damping: 10,
              delay: 0.25
            }}
          >
            <LogoFull size="xl" vertical animated />
          </motion.div>
          {/* App tagline – with animated pastel gradient text */}
          <motion.div
            initial={{ opacity: 0.12, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.04, duration: 0.75 }}
            className="relative z-10 text-xl font-semibold select-none"
            style={{
              background: "linear-gradient(90deg,#B993FE,#82D1F8,#FFD6F9)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              letterSpacing: "0.02em",
              textShadow: "0 2px 18px #b993fe44"
            }}
          >
            Free Your Voice, Have Fun Everywhere
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
