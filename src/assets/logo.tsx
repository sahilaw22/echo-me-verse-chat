
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/** New branded logo: Modern waveform + speech bubble, fits all sizes, gradient text */
export function AppWaveLogo({ size = 56 }: { size?: number }) {
  // SVG: a rounded rectangle as speech bubble, then a waveform path (fun and friendly!)
  return (
    <svg 
      width={size} height={size} viewBox="0 0 56 56" fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_2px_8px_rgba(163,109,241,0.08)]"
    >
      <defs>
        <linearGradient id="bubble-grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B993FE" />
          <stop offset="1" stopColor="#FFE7FA" />
        </linearGradient>
        <linearGradient id="wave-grad" x1="0" y1="28" x2="56" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#82D1F8" />
          <stop offset="0.6" stopColor="#A06DF2" />
          <stop offset="1" stopColor="#FFD6F9" />
        </linearGradient>
      </defs>
      {/* Speech bubble */}
      <rect x="5" y="7" width="46" height="37" rx="14" fill="url(#bubble-grad)" />
      {/* Waveform */}
      <path 
        d="M 14 32 Q 18 18 22 28 Q 26 40 30 28 Q 34 15 38 30 Q 42 42 46 18"
        stroke="url(#wave-grad)" strokeWidth="3.4" fill="none" strokeLinecap="round"
      />
      {/* Bubble tail */}
      <ellipse cx="28" cy="49" rx="8" ry="4" fill="#F7E4FA" opacity="0.7"/>
    </svg>
  );
}

export function Logo({
  className, size = "md", animated = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}) {
  const pxSize = { sm: 36, md: 56, lg: 92, xl: 144 }[size] ?? 56;
  const sizes = {
    sm: "h-9 w-9", md: "h-14 w-14",
    lg: "h-24 w-24", xl: "h-36 w-36",
  };
  const LogoIcon = (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      <AppWaveLogo size={pxSize} />
      <span
        className="absolute left-1/2 -translate-x-1/2 bottom-0.5 font-black select-none text-transparent bg-clip-text"
        style={{
          background: "linear-gradient(90deg,#B993FE,#82D1F8,#FFD6F9)",
          fontSize:
            size === "xl" ? "2.2rem"
              : size === "lg" ? "1.38rem"
              : size === "md" ? "0.98rem"
              : "0.77rem",
          WebkitBackgroundClip: "text",
          letterSpacing: "0.04em",
          textShadow: "0 2px 10px #a06df24c"
        }}
      >
        echo.me
      </span>
    </div>
  );
  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 94 }}
      >{LogoIcon}</motion.div>
    );
  }
  return LogoIcon;
}

export function LogoFull({
  className, vertical = false, animated = false, size = "md"
}: {
  className?: string;
  vertical?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const Text = (
    <span
      className="font-black tracking-tight text-transparent bg-clip-text"
      style={{
        background: "linear-gradient(89deg,#B993FE,#82D1F8,#FFD6F9)",
        fontSize: size === "xl" ? "2.8rem"
            : size === "lg" ? "2rem"
            : size === "md" ? "1.33rem"
            : "0.98rem",
        WebkitBackgroundClip: "text",
        letterSpacing: "-0.02em",
        lineHeight: "1.15",
        textShadow: "0 2px 18px #a06df215"
      }}
    >
      EchoMe
    </span>
  );
  const inner = vertical
    ? <div className={cn("flex flex-col items-center gap-2", className)}>
        <Logo size={size} />
        {Text}
      </div>
    : <div className={cn("flex items-center gap-2", className)}>
        <Logo size={size} />
        {Text}
      </div>;
  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 83 }}
      >{inner}</motion.div>
    );
  }
  return inner;
}
