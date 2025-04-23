
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Logo({
  className,
  size = "md",
  animated = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20",
    xl: "h-32 w-32",
  };

  const LogoComponent = () => (
    <div className={cn("relative", sizes[size], className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-[#FF9100] rounded-full opacity-90"></div>
      <div className="absolute inset-[2px] bg-black rounded-full"></div>
      <div className="absolute inset-[4px] bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
        <span className="font-bold text-white select-none" style={{fontSize: size === "xl" ? "2rem" : size === "lg" ? "1.5rem" : size === "md" ? "1rem" : "0.7rem"}}>
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
}: {
  className?: string;
  vertical?: boolean;
  animated?: boolean;
}) {
  const Component = () => (
    <div className={cn("flex items-center", vertical ? "flex-col gap-2" : "gap-3", className)}>
      <Logo />
      <div className={cn("font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent")}>
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
