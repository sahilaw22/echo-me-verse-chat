import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashScreen } from "@/components/SplashScreen";
import { MobileLayout } from "@/components/layouts/MobileLayout";

// Pages
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Home from "./pages/Home";
import Library from "./pages/Library";
import VoiceEffects from "./pages/VoiceEffects";
import VoiceClone from "./pages/VoiceClone";
import NoiseRoom from "./pages/NoiseRoom";
import PrankCalling from "./pages/PrankCalling";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CreateMusic from "./pages/CreateMusic";
import LyricsCreator from "./pages/LyricsCreator";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            {showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <Routes>
                {/* Auth Routes - Available when not authenticated */}
                <Route path="/signin" element={<SignIn onSignInSuccess={handleSignInSuccess} />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Routes - Only available when authenticated */}
                <Route element={<MobileLayout />}>
                  <Route
                    path="/"
                    element={isAuthenticated ? <Home /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/library"
                    element={isAuthenticated ? <Library /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/voice-effects"
                    element={isAuthenticated ? <VoiceEffects /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/voice-clone"
                    element={isAuthenticated ? <VoiceClone /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/noise-room"
                    element={isAuthenticated ? <NoiseRoom /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/prank-calling"
                    element={isAuthenticated ? <PrankCalling /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/settings"
                    element={isAuthenticated ? <Settings /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/profile"
                    element={isAuthenticated ? <Profile /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/create-music"
                    element={isAuthenticated ? <CreateMusic /> : <Navigate to="/signin" replace />}
                  />
                  <Route
                    path="/lyrics-creator"
                    element={isAuthenticated ? <LyricsCreator /> : <Navigate to="/signin" replace />}
                  />
                </Route>

                {/* Default redirect to signin when not authenticated */}
                <Route
                  path="*"
                  element={isAuthenticated ? <NotFound /> : <Navigate to="/signin" replace />}
                />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
