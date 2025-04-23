
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoFull } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";

// Add support for controlled navigation in preview
interface SignInProps {
  onSignedIn?: () => void;
  previewMode?: boolean;
}

export default function SignIn({ onSignedIn, previewMode = false }: SignInProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Signed in successfully",
    });

    setTimeout(() => {
      if (previewMode && onSignedIn) onSignedIn();
      // Else: in real app, it would navigate to "/"
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google Sign In",
      description: "This feature is coming soon!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
          animate={{ 
            x: ['-20%', '10%', '-20%'],
            y: ['-20%', '10%', '-20%'],
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
          }}
          style={{ top: '-20%', left: '-20%' }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl"
          animate={{ 
            x: ['10%', '-10%', '10%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ 
            repeat: Infinity,
            repeatType: "reverse",
            duration: 15,
          }}
          style={{ bottom: '-20%', right: '-20%' }}
        />
      </div>
      {isSigningIn ? (
        <div className="w-full max-w-sm z-10">
          <Button 
            variant="ghost" 
            className="mb-4 text-white hover:text-primary" 
            onClick={() => setIsSigningIn(false)}
          >
            &larr; Back
          </Button>
          <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl p-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="flex justify-center mb-6">
                <LogoFull />
              </div>
              <h1 className="text-xl font-bold text-primary">Sign in to EchoMe</h1>
              <p className="text-muted-foreground">Enter your details to continue</p>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/50 bg-black/50 text-white focus:border-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-primary/50 bg-black/50 text-white focus:border-secondary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                Sign In
              </Button>
              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 absolute w-full"></div>
                <span className="bg-black px-2 text-xs text-white/60 relative">OR</span>
              </div>
              <Button 
                type="button" 
                variant="outline"
                className="w-full border border-white/20 bg-black/60 text-white hover:bg-white/5"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="mr-2 h-5 w-5" /> Sign in with Google
              </Button>
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Don't have an account? {" "}
                  <span className="text-secondary hover:text-secondary/90 font-semibold" style={{ opacity: 0.7 }}>
                    (Preview only)
                  </span>
                </p>
              </div>
            </form>
          </Card>
        </div>
      ) : (
        <motion.div 
          className="flex flex-col items-center w-full max-w-sm space-y-8 text-center z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <LogoFull className="mb-8" size="lg" />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to EchoMe
            </h1>
            <p className="text-white/70">
              Transform your voice, play pranks, and have fun with friends!
            </p>
          </div>
          <div className="w-full space-y-4 pt-4">
            <Button 
              onClick={() => setIsSigningIn(true)}
              className="w-full py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              className="w-full py-6 text-lg border border-white/20 bg-black/60 text-white hover:bg-white/5 opacity-50 cursor-not-allowed"
              disabled
            >
              Create Account (Preview)
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ---
// This file is now longer than 200 lines. It's time to refactor it into smaller components for maintainability.
