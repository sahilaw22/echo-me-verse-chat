
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { LogoFull } from "@/assets/logo";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

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
          <ClerkSignIn 
            routing="path" 
            path="/signin" 
            signUpUrl="/signup" 
            afterSignInUrl="/"
            appearance={{
              elements: {
                rootBox: "w-full mx-auto",
                card: "bg-card shadow-xl border border-border rounded-xl p-6",
                headerTitle: "text-xl font-bold text-primary",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                socialButtonsBlockButton: "border-border text-foreground hover:bg-accent",
                footerActionText: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
              }
            }}
          />
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
