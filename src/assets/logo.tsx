
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20",
  };

  return (
    <div className={cn("relative", sizes[size], className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-90"></div>
      <div className="absolute inset-[2px] bg-white dark:bg-black rounded-full"></div>
      <div className="absolute inset-[4px] bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
        <span className="font-bold text-white select-none" style={{fontSize: size === "lg" ? "1.5rem" : size === "md" ? "1rem" : "0.7rem"}}>EM</span>
      </div>
    </div>
  );
}

export function LogoFull({
  className,
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <div className={cn("flex items-center", vertical ? "flex-col gap-2" : "gap-3", className)}>
      <Logo />
      <div className={cn("font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent")}>
        EchoMe
      </div>
    </div>
  );
}
