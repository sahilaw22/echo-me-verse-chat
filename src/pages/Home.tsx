
// Redesigned Home page: bigger logo hero, visual improvements, fill empty space

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogoFull } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Headphones, Volume, Share2, User } from "lucide-react";

const featureColors = [
  "bg-gradient-to-r from-primary/80 via-secondary to-secondary/80",
  "bg-gradient-to-r from-secondary/80 via-primary to-primary/80",
  "bg-gradient-to-r from-orange-400/90 to-primary/80",
  "bg-gradient-to-r from-amber-500/90 to-secondary/80",
];

export default function Home() {
  const [greeting, setGreeting] = useState("Welcome");
  const [user] = useState({
    fullName: "Guest User",
    firstName: "Guest",
    imageUrl: null
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Improved: larger logo, improved layout, added subtle background
  return (
    <div className="relative min-h-screen bg-background px-4 pb-20 flex flex-col">
      {/* Decorative background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <div className="absolute left-[-12%] top-[-8%] w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/15 blur-3xl"></div>
        <div className="absolute right-[-8%] bottom-[-12%] w-[380px] h-[380px] rounded-full bg-gradient-to-tl from-secondary/20 to-primary/15 blur-3xl"></div>
      </motion.div>

      <header className="flex justify-between items-center mb-8 z-10 relative">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <LogoFull size="xl" className="drop-shadow-xl" />
        </motion.div>
        <Link to="/settings">
          <Button variant="ghost" className="relative h-12 w-12 rounded-full">
            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
          </Button>
        </Link>
      </header>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 z-10 relative text-center"
      >
        <h1 className="text-3xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-lg">
          {greeting}, <span className="text-primary">{user?.firstName || "there"}!</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          You can transform your voice, chat, or have fun—where should we start?
        </p>
      </motion.section>

      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        {[
          {
            title: "Voice Effects",
            description: "Explore and use voice effects",
            icon: Volume,
            link: "/voice-effects"
          },
          {
            title: "Voice Clone",
            description: "Clone and customize voices",
            icon: Mic,
            link: "/voice-clone"
          },
          {
            title: "Noise Room",
            description: "Create or join voice chat rooms",
            icon: Headphones,
            link: "/noise-room"
          },
          {
            title: "Prank Room",
            description: "Make funny calls with voice effects",
            icon: Share2,
            link: "/prank-room"
          }
        ].map((feature, idx) => (
          <Link to={feature.link} key={feature.title}>
            <Card className={`h-full hover:shadow-xl transform transition hover:scale-105 group border-none bg-background/80`}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center shadow-lg ${featureColors[idx] || "bg-primary"}`}>
                  <feature.icon size={32} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-auto z-10"
      >
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-lg">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <div className="rounded-full bg-primary/20 p-4 mb-4 md:mb-0">
              <Mic className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-xl mb-1">Start Voice Cloning</h3>
              <p className="text-sm text-muted-foreground">
                Create your first custom voice in seconds.
              </p>
            </div>
            <Button asChild size="lg" className="px-8 py-3">
              <Link to="/voice-clone">Start</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
