import { motion } from "framer-motion";

export const AudioWaves = () => {
  // Generate bars for the audio wave
  const bars = Array.from({ length: 12 }).map((_, i) => ({
    height: Math.random() * 40 + 10,
    delay: i * 0.1,
  }));

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Center circle with gradient */}
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
      
      {/* Audio wave bars */}
      <div className="relative flex items-center justify-center gap-1">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full"
            initial={{ height: 10, opacity: 0.3 }}
            animate={{
              height: [10, bar.height, 10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: bar.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ripple effects */}
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
  );
};