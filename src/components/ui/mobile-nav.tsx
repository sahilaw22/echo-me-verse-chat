
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mic, Headphones, Volume, HomeIcon, Settings } from "lucide-react";

export function MobileNav() {
  const location = useLocation();
  
  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      name: "Effects",
      href: "/voice-effects",
      icon: Volume,
    },
    {
      name: "Clone",
      href: "/voice-clone",
      icon: Mic,
    },
    {
      name: "Rooms",
      href: "/noise-room",
      icon: Headphones,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card z-50 border-t border-border pb-safe">
      <nav className="flex justify-around">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center p-2 relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="indicator"
                  className="absolute inset-x-2 -top-3 h-1 rounded-full bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
