
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sun,
  Moon,
  User,
  Settings as SettingsIcon,
  HelpCircle,
  MessageSquare,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
  Mail
} from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [highQualityEnabled, setHighQualityEnabled] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </header>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Moon className="h-4 w-4" />
              Appearance
            </CardTitle>
            <CardDescription>Customize your app theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className={`h-16 ${theme === "light" ? "border-primary" : ""}`}
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light Mode
              </Button>
              <Button
                variant="outline"
                className={`h-16 ${theme === "dark" ? "border-primary" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark Mode
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" asChild>
              <a href="/profile">Edit Profile</a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="/profile/password">Change Password</a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Preferences
            </CardTitle>
            <CardDescription>Configure app preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about calls and messages
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-quality">High Quality Audio</Label>
                <p className="text-sm text-muted-foreground">
                  Use more data for better sound quality
                </p>
              </div>
              <Switch
                id="high-quality"
                checked={highQualityEnabled}
                onCheckedChange={setHighQualityEnabled}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Support
            </CardTitle>
            <CardDescription>Get help and provide feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Feedback
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Follow Us
            </CardTitle>
            <CardDescription>Connect with us on social media</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center h-16">
              <Instagram className="h-6 w-6" />
              <span className="text-xs mt-1">Instagram</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center h-16">
              <Twitter className="h-6 w-6" />
              <span className="text-xs mt-1">Twitter</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center h-16">
              <Linkedin className="h-6 w-6" />
              <span className="text-xs mt-1">LinkedIn</span>
            </Button>
          </CardContent>
        </Card>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="about">
            <AccordionTrigger>About EchoMe</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p className="text-sm">
                  EchoMe v1.0.0
                </p>
                <p className="text-sm">
                  Created by Lovable Technologies
                </p>
                <p className="text-sm mt-4 text-muted-foreground">
                  © 2025 EchoMe. All rights reserved.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
