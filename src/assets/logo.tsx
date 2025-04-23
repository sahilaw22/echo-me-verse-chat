
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/** Modern, light-gradient microphone & soundwave logo for Splash */
function MicWaveLogoSVG({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="gradient1" cx="50%" cy="40%" r="85%">
          <stop offset="0%" stopColor="#FFFAE3" />
          <stop offset="60%" stopColor="#FFC8A8" />
          <stop offset="99%" stopColor="#B2D8FF" />
        </radialGradient>
        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="56">
          <stop stopColor="#A4EDFF" />
          <stop offset="0.8" stopColor="#FDF6E3" />
        </linearGradient>
        <linearGradient id="wave" x1="0" y1="0" x2="70" y2="0">
          <stop stopColor="#A4EDFF" />
          <stop offset="0.7" stopColor="#FFC8A8" />
          <stop offset="1" stopColor="#F6E6FF" />
        </linearGradient>
      </defs>
      {/* Mic body */}
      <rect x="22" y="14" width="12" height="18" rx="6" fill="url(#gradient1)" />
      {/* Mic head */}
      <ellipse cx="28" cy="18" rx="6.5" ry="5" fill="#fff" fillOpacity="0.85" />
      {/* Sound waves (left/right) */}
      <path d="M12 26c0-7 4-14 10-16.5" stroke="url(#wave)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M44 26c0-7-4-14-10-16.5" stroke="url(#wave)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Lower stem */}
      <rect x="26" y="32" width="4" height="8" rx="2" fill="url(#gradient2)" />
      {/* Stand */}
      <rect x="20" y="44" width="16" height="4" rx="2" fill="#A4EDFF" />
      {/* Decorative sparkle */}
      <circle cx="44" cy="12" r="1.5" fill="#FFE29F" opacity={0.85}/>
    </svg>
  );
}

export function Logo({
  className,
  size = "md",
  animated = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}) {
  const pxSize = { sm: 36, md: 56, lg: 90, xl: 140 }[size] ?? 56;
  const sizes = {
    sm: "h-9 w-9",
    md: "h-14 w-14",
    lg: "h-[90px] w-[90px]",
    xl: "h-[140px] w-[140px]",
  };

  const LogoComponent = () => (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fffae3] via-[#ffc8a8]/60 to-[#a4edff] opacity-85"></div>
      <div className="absolute inset-[3px] rounded-full bg-white/90"></div>
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        <MicWaveLogoSVG size={pxSize * 0.82}/>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 92, duration: 0.7 }}
      >
        <LogoComponent />
      </motion.div>
    );
  }
  return <LogoComponent />;
}

// App name with animated gradient text
export function LogoFull({
  className,
  vertical = false,
  animated = false,
  size = "md",
}: {
  className?: string;
  vertical?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const name = "EchoVerse";
  const textGradient = "bg-gradient-to-r from-[#a4edff] via-[#ffc8a8] to-[#f6e6ff] bg-clip-text text-transparent";
  const fontClass = "font-extrabold drop-shadow-lg tracking-tight";

  const Title = () => (
    <div
      className={cn(
        "text-2xl",
        fontClass,
        textGradient,
        { "text-4xl": size === "lg", "text-5xl": size === "xl", "text-2xl": size === "md" }
      )}
      style={{
        letterSpacing: "0.04em",
        lineHeight: 1.1,
        filter: "brightness(1.08)",
      }}
    >
      {name}
    </div>
  );

  const Component = () => (
    <div className={cn("flex items-center", vertical ? "flex-col gap-3" : "gap-4", className)}>
      <Logo size={size} />
      <Title />
    </div>
  );
  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 74, duration: 0.8 }}
      >
        <Component />
      </motion.div>
    );
  }
  return <Component />;
}

