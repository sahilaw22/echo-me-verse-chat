
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashScreen } from "@/components/SplashScreen";
import { MobileLayout } from "@/components/layouts/MobileLayout";

// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Library from "./pages/Library";
import VoiceEffects from "./pages/VoiceEffects";
import VoiceClone from "./pages/VoiceClone";
import NoiseRoom from "./pages/NoiseRoom";
import PrankRoom from "./pages/PrankRoom";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Always show splash screen on initial app load
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // When user logs in, you may want to trigger splash again; adjust logic if needed
  const handleSuccessfulAuth = () => {
    setIsAuthenticated(true);
    setShowSplash(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            {showSplash ? (
              <SplashScreen onComplete={() => setShowSplash(false)} />
            ) : (
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<MobileLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/voice-effects" element={<VoiceEffects />} />
                  <Route path="/voice-clone" element={<VoiceClone />} />
                  <Route path="/noise-room" element={<NoiseRoom />} />
                  <Route path="/prank-room" element={<PrankRoom />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
