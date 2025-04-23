
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoFull } from "@/assets/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Mock successful login
    toast({
      title: "Success",
      description: "Signed in successfully",
    });
    
    // Navigate to home page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-accent">
      {isSigningIn ? (
        <div className="w-full max-w-sm">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => setIsSigningIn(false)}
          >
            &larr; Back
          </Button>
          
          <Card className="bg-card shadow-xl border border-border rounded-xl p-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <h1 className="text-xl font-bold text-primary">Sign in to EchoMe</h1>
              <p className="text-muted-foreground">Enter your details to continue</p>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full">Sign In</Button>
              
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Don't have an account? {" "}
                  <Link to="/signup" className="text-primary hover:text-primary/90">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      ) : (
        <motion.div 
          className="flex flex-col items-center w-full max-w-sm space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoFull className="mb-8" />
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome to EchoMe</h1>
            <p className="text-muted-foreground">
              Transform your voice, play pranks, and have fun with friends!
            </p>
          </div>
          
          <div className="w-full space-y-4 pt-4">
            <Button 
              onClick={() => setIsSigningIn(true)}
              className="w-full py-6 text-lg"
            >
              Sign In
            </Button>
            
            <Button variant="outline" asChild className="w-full py-6 text-lg">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
