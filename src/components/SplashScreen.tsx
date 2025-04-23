
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
      setTimeout(onComplete, 500); // Give time for exit animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 4,
            }}
          />
          
          {/* Particles animation */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/30"
                style={{ 
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i + 20}
                className="absolute rounded-full bg-secondary/30"
                style={{ 
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10"
            animate={{ 
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
            }}
          >
            <LogoFull vertical className="mb-8" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative z-10 text-lg text-white/80 mt-4"
            style={{ textShadow: "0 0 10px rgba(255, 194, 7, 0.5)" }}
          >
            I'm you &amp; you're me
          </motion.div>
          
          <motion.div 
            className="absolute top-16 w-36 h-1 bg-gradient-to-r from-primary to-secondary rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-white/50"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

