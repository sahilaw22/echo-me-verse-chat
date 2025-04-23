
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogoFull } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Headphones, Volume, Share2, User } from "lucide-react";

// Preview image from Unsplash for vibe/attractiveness
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

export default function Home() {
  const [greeting, setGreeting] = useState("Welcome");
  const [user, setUser] = useState({
    fullName: "Guest User",
    firstName: "Guest",
    imageUrl: null,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const features = [
    {
      title: "Voice Effects",
      description: "Transform your voice in real-time or recordings.",
      icon: Volume,
      link: "/voice-effects",
      color: "bg-gradient-to-tr from-yellow-200 via-yellow-300 to-orange-200",
    },
    {
      title: "Voice Clone",
      description: "Clone and customize unique voices instantly.",
      icon: Mic,
      link: "/voice-clone",
      color: "bg-gradient-to-tr from-orange-200 via-orange-400 to-yellow-300",
    },
    {
      title: "Noise Room",
      description: "Hang out in fun, themed voice chatrooms.",
      icon: Headphones,
      link: "/noise-room",
      color: "bg-gradient-to-tr from-yellow-100 via-orange-100 to-orange-300",
    },
    {
      title: "Prank Room",
      description: "Play around with voice effects on your friends.",
      icon: Share2,
      link: "/prank-room",
      color: "bg-gradient-to-tr from-yellow-200 to-orange-400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-0 pb-20 bg-gradient-to-br from-[#FEF7CD] via-[#FEC6A1] to-[#F97316]">
      <header className="flex justify-between items-center px-4 pt-4 mb-1">
        <LogoFull />
        <Link to="/settings">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <div className="h-10 w-10 rounded-full bg-orange-300 text-orange-900 flex items-center justify-center shadow">
              <User className="h-5 w-5" />
            </div>
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center px-6 mt-2 mb-8"
      >
        {/* Friendly image */}
        <img
          src={HERO_IMAGE}
          alt="Voice magic workspace"
          className="mb-4 rounded-xl object-cover w-full max-w-xs shadow-lg border border-yellow-200"
          style={{ maxHeight: '170px' }}
        />
        <h1 className="text-3xl font-bold text-orange-700 drop-shadow mb-1 text-center">
          {greeting}, <span className="text-orange-500">{user?.firstName || "there"}!</span>
        </h1>
        <p className="text-md text-orange-900 text-center max-w-md">
          Welcome to <b className="text-orange-600">AudioJuice</b> –
          <br />
          <span className="font-medium">Experiment with effects, clone voices, and have a blast! </span>
        </p>
        <p className="text-sm text-orange-800 mt-2 mb-2 text-center">
          🎉 Make your voice stand out &amp; turn every moment into a playful sound adventure!
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 mb-10">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.11 }}
          >
            <Link to={feature.link}>
              <Card className={`h-full p-0 hover-scale glass-morphism ${feature.color} shadow-md`}>
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/70 border border-orange-200 shadow flex items-center justify-center mb-3">
                    <feature.icon size={22} className="text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-orange-800">{feature.title}</h3>
                  <p className="text-xs text-orange-700">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-auto mx-4"
      >
        <Card className="bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-200 border-none shadow-lg">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="rounded-full bg-orange-300 p-3">
              <Mic className="h-6 w-6 text-orange-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-800">Start Voice Cloning</h3>
              <p className="text-xs text-orange-700">
                Clone your own voice, a friend&apos;s, or try something totally new!
              </p>
            </div>
            <Button asChild size="sm" className="bg-orange-400 text-white hover:bg-orange-500 shadow">
              <Link to="/voice-clone">Start</Link>
            </Button>
          </CardContent>
        </Card>
        <div className="text-center text-orange-800 mt-4 text-xs font-medium">
          <span>✨ Ready to create &nbsp;|&nbsp; Share &nbsp;|&nbsp; Laugh!</span>
        </div>
      </motion.div>
    </div>
  );
}

