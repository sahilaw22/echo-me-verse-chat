
import React from "react";
import { Outlet } from "react-router-dom";
import { MobileNav } from "@/components/ui/mobile-nav";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface MobileLayoutProps {
  hideNavigation?: boolean;
  children?: React.ReactNode;
}

export function MobileLayout({ hideNavigation, children }: MobileLayoutProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  const showNav = !hideNavigation && !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-background">
      <main className={cn("flex-1 flex flex-col w-full", showNav && "pb-16")}>
        {children || <Outlet />}
      </main>
      
      {showNav && <MobileNav />}
    </div>
  );
}
