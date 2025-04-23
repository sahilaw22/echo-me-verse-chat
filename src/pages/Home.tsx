import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogoFull } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Headphones, Volume, Share2, User, Library } from "lucide-react";

export default function Home() {
  const [greeting, setGreeting] = useState("Welcome");
  const [user, setUser] = useState({
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

  const features = [
    {
      title: "Library",
      description: "View your saved voices & effects",
      icon: Library,
      link: "/library",
      color: "bg-[linear-gradient(90deg,#B993FE,#FFF4F9)] from-purple-400 to-pink-200",
    },
    {
      title: "Voice Effects",
      description: "Explore and use voice effects",
      icon: Volume,
      link: "/voice-effects",
      color: "bg-[linear-gradient(90deg,#82D1F8,#B993FE)] from-sky-300 to-violet-300",
    },
    {
      title: "Voice Clone",
      description: "Clone and customize voices",
      icon: Mic,
      link: "/voice-clone",
      color: "bg-[linear-gradient(90deg,#FFD6F9,#B993FE)] from-pink-300 to-purple-300",
    },
    {
      title: "Noise Room",
      description: "Create/join voice chat rooms",
      icon: Headphones,
      link: "/noise-room",
      color: "bg-[linear-gradient(90deg,#B993FE,#82D1F8)] from-purple-300 to-sky-200",
    },
    {
      title: "Prank Room",
      description: "Make funny calls with voice effects",
      icon: Share2,
      link: "/prank-room",
      color: "bg-[linear-gradient(90deg,#FFF4F9,#B993FE)] from-pink-100 to-violet-100",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-gradient-to-bl from-[#f1f2fa] via-[#eeebfa] to-[#ffd6f9]">
      <header className="flex justify-between items-center mb-6">
        <LogoFull />
        <Link to="/settings">
          <Button 
            variant="ghost" 
            className="relative h-10 w-10 rounded-full hover:bg-gradient-to-br from-[#ece9f6] to-[#82d1f88a]"
          >
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
              <User className="h-5 w-5" />
            </div>
          </Button>
        </Link>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-extrabold" style={{
          background: "linear-gradient(90deg,#B993FE,#82D1F8,#FFD6F9)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          {greeting}, <span className="text-primary">{user?.firstName || "there"}!</span>
        </h1>
        <p className="text-muted-foreground font-medium">What would you like to do today?</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.09 }}
            className="hover:scale-105 transition-transform"
          >
            <Link to={feature.link}>
              <Card className="h-full group hover:shadow-xl transition-all border-none bg-white/85 hover:bg-white/95">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div 
                    className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center shadow-lg bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform`}>
                    <feature.icon size={26} />
                  </div>
                  <h3 className="font-semibold text-md"
                    style={{
                      background: "linear-gradient(90deg,#B993FE,#82D1F8,#FFD6F9)",
                      WebkitBackgroundClip: "text",
                      color: "transparent"
                    }}
                  >{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-auto"
      >
        <Card className="bg-gradient-to-r from-[#f3eaff]/60 via-[#d0e7fb]/60 to-[#FFD6F9]/60 border-none shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-primary/20 p-3">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold"
                style={{
                  background: "linear-gradient(90deg,#B993FE,#82D1F8,#FFD6F9)",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >Start Voice Cloning</h3>
              <p className="text-xs text-muted-foreground">Create your first voice clone</p>
            </div>
            <Button asChild size="sm" className="bg-gradient-to-r from-[#B993FE] to-[#FFD6F9] text-white shadow">
              <Link to="/voice-clone">Start</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
