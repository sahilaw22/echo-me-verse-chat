
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { LogoFull } from "@/assets/logo";
import { AvatarMenu } from "@/components/ui/avatar-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Headphones, Volume, Share2 } from "lucide-react";

export default function Home() {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const features = [
    {
      title: "Voice Effects",
      description: "Explore and use voice effects",
      icon: Volume,
      link: "/voice-effects",
      color: "bg-primary",
    },
    {
      title: "Voice Clone",
      description: "Clone and customize voices",
      icon: Mic,
      link: "/voice-clone",
      color: "bg-secondary",
    },
    {
      title: "Noise Room",
      description: "Create or join voice chat rooms",
      icon: Headphones,
      link: "/noise-room",
      color: "bg-orange-400",
    },
    {
      title: "Prank Room",
      description: "Make funny calls with voice effects",
      icon: Share2,
      link: "/prank-room",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <LogoFull />
        {user && <AvatarMenu username={user.fullName || user.username || ""} imageUrl={user.imageUrl} />}
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">
          {greeting}, <span className="text-primary">{user?.firstName || "there"}!</span>
        </h1>
        <p className="text-muted-foreground">What would you like to do today?</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div 
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={feature.link}>
              <Card className="h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full ${feature.color} text-white flex items-center justify-center mb-3`}>
                    <feature.icon size={20} />
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
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
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full bg-primary/20 p-3">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Start Voice Cloning</h3>
              <p className="text-xs text-muted-foreground">Create your first voice clone</p>
            </div>
            <Button asChild size="sm">
              <Link to="/voice-clone">Start</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
