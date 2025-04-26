import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [bars] = useState(Array.from({ length: 12 }).map(() => Math.random() * 40 + 10));
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
        navigate('/signin');
      }, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete, navigate]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Audio Wave Animation */}
          <div className="relative w-40 h-40 flex items-center justify-center mb-8">
            <motion.div
              className="absolute w-24 h-24 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Audio Bars */}
            <div className="relative flex items-center justify-center gap-1">
              {bars.map((height, index) => (
                <motion.div
                  key={index}
                  className="w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full"
                  initial={{ height: 10, opacity: 0.3 }}
                  animate={{
                    height: [10, height, 10],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Ripple Effects */}
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-full h-full rounded-full border-2 border-primary/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.6,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Brand Name */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl font-bold tracking-tight mt-4"
            style={{ fontFamily: 'Poppins, Montserrat, Lato, sans-serif', letterSpacing: '-0.02em' }}
          >
            <span className="text-white">echo</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

