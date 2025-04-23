
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/** Microphone+wave logo SVG, fits all sizes, orange/yellow gradient for EchoMe feel */
function EchoMeMicSVG({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="em-mic-grad" cx="65%" cy="25%" r="95%">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="70%" stopColor="#FF9100" />
          <stop offset="100%" stopColor="#E65100" />
        </radialGradient>
        <linearGradient id="em-wave-grad" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#26A69A" />
          <stop offset="0.55" stopColor="#FF9100"/>
          <stop offset="1" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      {/* Mic body */}
      <rect x="18" y="12" width="12" height="20" rx="6" fill="url(#em-mic-grad)"/>
      {/* Mic grill */}
      <ellipse cx="24" cy="15" rx="6" ry="3.5" fill="white" fillOpacity="0.7"/>
      {/* Lower stem */}
      <rect x="22" y="32" width="4" height="7" rx="2" fill="#FFC107"/>
      {/* Stand */}
      <rect x="17" y="40" width="14" height="3" rx="1.5" fill="#26A69A"/>
      {/* Sound waves (left/right) */}
      <path d="M11 23c0-5.6 3-10.6 7.5-12.5" stroke="url(#em-wave-grad)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M37 23c0-5.5-3-10.5-7.5-12.5" stroke="url(#em-wave-grad)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Decorative tiny dot for playful detail */}
      <circle cx="37" cy="11" r="1.2" fill="#FFC107" opacity={0.65}/>
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
  const pxSize = { sm: 32, md: 48, lg: 80, xl: 128 }[size] ?? 48;
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20",
    xl: "h-32 w-32",
  };

  const LogoComponent = () => (
    <div className={cn("relative flex items-center justify-center", sizes[size], className)}>
      {/* Logo base circle background */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary via-secondary to-[#FF9100] rounded-full opacity-85"></div>
      <div className="absolute inset-[2px] z-20 bg-black rounded-full"></div>
      {/* The new logo: microphone graphic + letters */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
        <EchoMeMicSVG size={pxSize * 0.78} />
        {/* "EM" letters, below the mic for brand ID */}
        <span
          className="font-extrabold tracking-widest text-white select-none mt-1"
          style={{
            fontSize:
              size === "xl"
                ? "1.45rem"
                : size === "lg"
                  ? "1.15rem"
                  : size === "md"
                    ? "0.93rem"
                    : "0.75rem",
            textShadow: "0 1px 4px #E65100aa"
          }}
        >
          EM
        </span>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <LogoComponent />
      </motion.div>
    );
  }

  return <LogoComponent />;
}

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
  const Component = () => (
    <div className={cn("flex items-center", vertical ? "flex-col gap-2" : "gap-3", className)}>
      <Logo size={size} />
      <div className="font-extrabold text-2xl bg-gradient-to-r from-primary via-[#FF9100] to-secondary bg-clip-text text-transparent tracking-tight drop-shadow-md">
        EchoMe
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Component />
      </motion.div>
    );
  }

  return <Component />;
}
