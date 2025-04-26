import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Phone, PhoneOff, User, Volume, X, Check } from "lucide-react";

export default function PrankCalling() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  
  const handleStartCall = () => {
    setIsCallActive(true);
  };
  
  const handleEndCall = () => {
    setIsCallActive(false);
  };
  
  const handleSelectVoice = (voice: string) => {
    setSelectedVoice(voice);
    setVoiceDialogOpen(false);
  };
  
  // Mock data
  const contacts = [
    { id: "c1", name: "Alex Johnson", number: "123-456-7890", recent: true },
    { id: "c2", name: "Taylor Smith", number: "234-567-8901", recent: false },
    { id: "c3", name: "Jordan Lee", number: "345-678-9012", recent: true },
    { id: "c4", name: "Casey Brown", number: "456-789-0123", recent: false },
  ];
  
  const voiceEffects = [
    { id: "v1", name: "Robot Voice", type: "effect" },
    { id: "v2", name: "Morgan Freeman", type: "celebrity" },
    { id: "v3", name: "Friend 1", type: "clone" },
  ];
  
  const filteredContacts = contacts.filter(contact => 
    activeTab === "recent" 
      ? contact.recent 
      : contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        contact.number.includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prank Room</h1>
        
        {selectedVoice && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setVoiceDialogOpen(true)}
          >
            <Volume className="h-4 w-4 mr-2" />
            {selectedVoice}
          </Button>
        )}
      </header>
      
      <AnimatePresence>
        {isCallActive ? (
          <ActiveCall onEndCall={handleEndCall} selectedVoice={selectedVoice} />
        ) : (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search contacts or enter number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Tabs defaultValue="contacts" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contacts">All Contacts</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-3">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{contact.name}</h3>
                              <p className="text-sm text-muted-foreground">{contact.number}</p>
                            </div>
                          </div>
                          <Button 
                            size="icon" 
                            onClick={handleStartCall}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  {searchTerm 
                    ? "No contacts found matching your search" 
                    : "No contacts found"}
                </p>
              )}
              
              {searchTerm && !isNaN(searchTerm.replace(/[-\s]/g, '') as any) && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Dial Number</h3>
                          <p className="text-sm text-muted-foreground">{searchTerm}</p>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        onClick={handleStartCall}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="mt-8">
              <Button 
                className="w-full"
                variant={selectedVoice ? "default" : "secondary"}
                onClick={() => setVoiceDialogOpen(true)}
              >
                <Volume className="h-4 w-4 mr-2" />
                {selectedVoice ? "Change Voice Effect" : "Select Voice Effect"}
              </Button>
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Voice Selection Dialog */}
      <Dialog open={voiceDialogOpen} onOpenChange={setVoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Voice Effect</DialogTitle>
            <DialogDescription>
              Choose a voice effect or clone to use during your call
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <Tabs defaultValue="effects">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="effects">Effects</TabsTrigger>
                <TabsTrigger value="celebrities">Celebrities</TabsTrigger>
                <TabsTrigger value="clones">My Clones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="effects" className="mt-4">
                <div className="space-y-2">
                  {voiceEffects
                    .filter(v => v.type === "effect")
                    .map(voice => (
                      <VoiceOption 
                        key={voice.id}
                        voice={voice}
                        isSelected={selectedVoice === voice.name}
                        onSelect={() => handleSelectVoice(voice.name)}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="celebrities" className="mt-4">
                <div className="space-y-2">
                  {voiceEffects
                    .filter(v => v.type === "celebrity")
                    .map(voice => (
                      <VoiceOption 
                        key={voice.id}
                        voice={voice}
                        isSelected={selectedVoice === voice.name}
                        onSelect={() => handleSelectVoice(voice.name)}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="clones" className="mt-4">
                <div className="space-y-2">
                  {voiceEffects
                    .filter(v => v.type === "clone")
                    .map(voice => (
                      <VoiceOption 
                        key={voice.id}
                        voice={voice}
                        isSelected={selectedVoice === voice.name}
                        onSelect={() => handleSelectVoice(voice.name)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVoiceDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type VoiceOptionProps = {
  voice: { id: string; name: string; type: string };
  isSelected: boolean;
  onSelect: () => void;
};

function VoiceOption({ voice, isSelected, onSelect }: VoiceOptionProps) {
  return (
    <Card 
      className={`cursor-pointer ${isSelected ? "border-primary" : ""}`}
      onClick={onSelect}
    >
      <CardContent className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Volume className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{voice.name}</h3>
          </div>
        </div>
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </CardContent>
    </Card>
  );
}

interface ActiveCallProps {
  onEndCall: () => void;
  selectedVoice: string;
}

function ActiveCall({ onEndCall, selectedVoice }: ActiveCallProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-[60vh]"
    >
      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-6">
        <User className="h-12 w-12 text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-1">Casey Brown</h2>
      <p className="text-muted-foreground mb-2">Mobile · 456-789-0123</p>
      {selectedVoice && (
        <div className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full mb-4 flex items-center">
          <Volume className="h-3 w-3 mr-1" />
          Using: {selectedVoice}
        </div>
      )}
      <p className="text-xl mb-10">{formatTime(callDuration)}</p>
      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-full"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <Volume className="h-6 w-6 text-destructive" />
          ) : (
            <Volume className="h-6 w-6" />
          )}
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="w-14 h-14 rounded-full"
          onClick={onEndCall}
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-14 h-14 rounded-full"
          onClick={() => setIsMuted(!isMuted)}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    </motion.div>
  );
}
