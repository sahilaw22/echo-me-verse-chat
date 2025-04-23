
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashScreen } from "@/components/SplashScreen";

// Modified import (we won't use MobileLayout/routes for preview sequence)
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

const App = () => {
  const [stage, setStage] = useState<"splash" | "signin" | "home">("splash");

  // Splash for 3s, then SignIn, then Home
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            {stage === "splash" && (
              <SplashScreen onComplete={() => setStage("signin")} />
            )}
            {stage === "signin" && (
              <SignIn
                // add a prop to SignIn so we can jump to Home after login for preview
                onSignedIn={() => setStage("home")}
                previewMode
              />
            )}
            {stage === "home" && <Home />}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
