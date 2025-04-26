import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Headphones, Library, Phone, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { AudioWaves } from "@/components/AudioWaves";

export default function Home() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Welcome");
  const [user] = useState({
    fullName: "Guest User",
    firstName: "Guest",
    imageUrl: null
  });
  const [showAccountMenu, setShowAccountMenu] = useState(false);

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
      color: "from-amber-500 to-yellow-400",
      shadow: "shadow-amber-500/30",
    },
    {
      title: "Create Music",
      description: "Compose and listen to your own music",
      icon: Music,
      link: "/create-music",
      color: "from-green-500 to-teal-500",
      shadow: "shadow-green-500/30",
    },
    {
      title: "Voice Clone",
      description: "Clone and customize voices",
      icon: Mic,
      link: "/voice-clone",
      color: "from-blue-600 to-purple-600",
      shadow: "shadow-blue-500/30",
    },
    {
      title: "Noise Room",
      description: "Create or join voice chat rooms",
      icon: Headphones,
      link: "/noise-room",
      color: "from-pink-500 to-orange-400",
      shadow: "shadow-pink-500/30",
    },
    {
      title: "Prank Calling",
      description: "Make funny calls with voice effects",
      icon: Phone,
      link: "/prank-calling",
      color: "from-fuchsia-500 to-pink-500",
      shadow: "shadow-fuchsia-500/30",
    },
  ];

  const handleSignOut = () => {
    // TODO: Implement any cleanup of auth state here
    setShowAccountMenu(false);
    navigate('/signin');
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto w-full px-2 sm:px-0 relative overflow-hidden">
      {/* Account icon section */}
      <div className="absolute top-4 right-4 z-20">
        <button
          className="focus:outline-none"
          onClick={() => setShowAccountMenu((v) => !v)}
        >
          <Avatar className="w-12 h-12 border-2 border-primary shadow-lg">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="User" className="object-cover w-12 h-12 rounded-full" />
            ) : (
              <span className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white rounded-full font-bold">
                {user.firstName.charAt(0)}
              </span>
            )}
          </Avatar>
        </button>
        {showAccountMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 z-30">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="w-10 h-10">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt="User" className="object-cover w-10 h-10 rounded-full" />
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full font-bold">
                    {user.firstName.charAt(0)}
                  </span>
                )}
              </Avatar>
              <div>
                <div className="font-semibold">{user.fullName}</div>
                <div className="text-xs text-gray-400">Account Settings</div>
              </div>
            </div>
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            <button 
              onClick={() => navigate('/profile')}
              className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Profile
            </button>
            <button 
              onClick={() => navigate('/settings')} 
              className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Settings
            </button>
            <button 
              onClick={handleSignOut}
              className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-red-500 hover:text-red-600"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Logo Section - Replaced with AudioWaves */}
      <div className="flex flex-col items-center mt-8 mb-8">
        <div className="flex flex-col items-center mb-4 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            <AudioWaves />
          </motion.div>

          {/* Brand Name */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'Poppins, Montserrat, Lato, sans-serif', letterSpacing: '-0.02em' }}
          >
            <span className="text-white">echo</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span>
          </motion.span>
        </div>

        {/* Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xl sm:text-2xl font-medium text-white/90 mt-6 mb-8"
        >
          {greeting}, <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{user?.firstName || "there"}</span>
        </motion.div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.09 }}
            whileHover={{ scale: 1.04 }}
          >
            <Link to={feature.link} className="block h-full">
              <Card className={cn(
                "glass-morphism h-full group border border-gray-800 transition-all duration-300 hover:shadow-xl hover:border-transparent hover:bg-gradient-to-br",
                `hover:${feature.color}`
              )}>
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                    feature.color, feature.shadow
                  )}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="font-semibold text-base mb-1 text-white drop-shadow-lg">{feature.title}</h3>
                  <p className="text-xs text-gray-300 opacity-80 line-clamp-2">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Call to action card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-auto mb-8"
      >
        <Card className="bg-gradient-to-r from-purple-700/60 to-blue-700/60 border-none shadow-xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="rounded-full bg-primary/30 p-4 flex-shrink-0">
              <Mic className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 text-white">Start Voice Cloning</h3>
              <p className="text-xs text-gray-200 opacity-90 line-clamp-1">Create your first voice clone</p>
            </div>
            <Button asChild size="lg" className="flex-shrink-0 shadow-lg hover:shadow-xl transition-all text-base font-bold px-6 py-2">
              <Link to="/voice-clone">Start</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
