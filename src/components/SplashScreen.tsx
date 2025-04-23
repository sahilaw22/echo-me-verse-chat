
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoFull } from "@/assets/logo";

// Splash screen with new logo, animated light gradients, and glowing text
interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 700); // Allow exit animation
    }, 2700);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden bg-gradient-to-br from-[#fffdeb] via-[#fff8ee] to-[#e2f7ff]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.46 }}
        >
          {/* Animated Glow Gradients */}
          <motion.div
            className="absolute w-[530px] h-[530px] rounded-full bg-gradient-to-br from-[#a4edff]/40 via-[#fffbe9] to-[#fbe0be]/60 blur-3xl"
            initial={{ scale: 0.96, opacity: 0.42 }}
            animate={{
              scale: [0.96, 1.08, 0.96],
              opacity: [0.42, 0.58, 0.42],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 6,
            }}
          />
          <motion.div
            className="absolute w-[320px] h-[260px] left-[55%] top-[20%] rounded-full bg-gradient-to-tr from-[#ffc8a8]/50 via-[#ffe29f]/60 to-[#e0fffa]/60 blur-2xl"
            animate={{
              rotate: [0, 15, 0],
              opacity: [0.12, 0.29, 0.12],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              repeatType: "mirror"
            }}
          />
          {/* Shimmer spark */}
          <motion.div
            className="absolute bottom-[25%] left-[35%] w-24 h-24 rounded-full bg-gradient-to-tr from-[#fffde3]/60 to-[#ffc8a8]/30 blur-2xl"
            animate={{
              x: [0, 32, 0],
              y: [0, -14, 0],
              opacity: [0.18, 0.38, 0.18]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              repeatType: "mirror"
            }}
          />
          {/* Animated Logo */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: [0.98, 1.09, 0.98]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.8,
              ease: "easeInOut"
            }}
          >
            <LogoFull animated size="lg" vertical />
          </motion.div>
          {/* Colorful animated brand text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, duration: 0.7 }}
            className="relative z-10 mt-6 mb-1 text-center select-none"
          >
            <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-[#A4EDFF] via-[#FFC8A8] to-[#F6E6FF] bg-clip-text text-transparent drop-shadow-lg">
              Welcome to <span className="font-black">EchoVerse</span>
            </h1>
            <p className="mt-2 text-[1.08rem] text-[#b09478] font-medium sm:text-lg italic opacity-80 drop-shadow">
              Voice. Connect. Play.<span className="ml-1 animate-pulse text-[#A4EDFF]">🎙️</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
