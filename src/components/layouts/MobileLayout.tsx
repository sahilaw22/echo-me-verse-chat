import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MobileNav } from "@/components/ui/mobile-nav";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { NoInternetScreen } from "@/components/ui/NoInternetScreen";

interface MobileLayoutProps {
  hideNavigation?: boolean;
  children?: React.ReactNode;
}

export function MobileLayout({ hideNavigation, children }: MobileLayoutProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  const showNav = !hideNavigation && !isAuthPage;

  // Online/offline detection
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const updateOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    updateOnline();
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-black overflow-hidden">
      {/* Vibrant gradient and neon glows */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40 rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-blue-700/30 via-black to-purple-700/30 rounded-full blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-gradient-radial from-purple-800/10 via-black/80 to-black/100 rounded-full blur-2xl opacity-80" />
      </div>
      <main className={cn("flex-1 flex flex-col w-full z-10", showNav && "pb-16")}>
        {children || <Outlet />}
      </main>
      
      {showNav && <MobileNav />}
      {!isOnline && <NoInternetScreen onRetry={() => window.location.reload()} />}
    </div>
  );
}
