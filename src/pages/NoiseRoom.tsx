import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, LogIn, Users, Share2, Lock, Copy, Music, MessageSquare, Phone, Mic } from "lucide-react";
import { cn, layoutClasses } from "@/lib/utils";

// Mock data for active rooms
const mockRooms = [
  { id: "r1", name: "Gaming Squad", members: 5, isPrivate: true },
  { id: "r2", name: "Music Lovers", members: 3, isPrivate: false },
  { id: "r3", name: "Meme Review", members: 8, isPrivate: false },
];

// Simple mock for effects/clones -- could later link to user's real library
const allVoices = [
  { id: "1", name: "Robot", icon: <Mic className="h-4 w-4 inline mr-1" />, type: "effect" },
  { id: "2", name: "Chipmunk", icon: <Mic className="h-4 w-4 inline mr-1" />, type: "effect" },
  { id: "3", name: "Deep Voice", icon: <Mic className="h-4 w-4 inline mr-1" />, type: "effect" },
  { id: "4", name: "My Voice Clone", icon: <Mic className="h-4 w-4 inline mr-1" />, type: "clone" },
];

export default function NoiseRoom() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [roomJoined, setRoomJoined] = useState<string | null>(null);
  
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [selectedVoiceId, setSelectedVoiceId] = useState("1");

  const handleCreateRoom = () => {
    setCreateDialogOpen(false);
    const newRoomId = "r" + (Math.floor(Math.random() * 1000) + 1).toString();
    setRoomJoined(newRoomId);
  };
  
  const handleJoinRoom = (roomId: string) => {
    setJoinDialogOpen(false);
    setRoomJoined(roomId);
  };
  
  const handleLeaveRoom = () => {
    setRoomJoined(null);
  };

  return (
    <div className={cn(layoutClasses.pageWrapper, "pb-safe-area-bottom")}>
      <div className={layoutClasses.mainContent}>
        <header className={cn(
          layoutClasses.flexBetween,
          "mb-6 flex-wrap gap-4"
        )}>
          <h1 className="text-2xl font-bold sm:text-3xl">Noise Room</h1>
        </header>

        <AnimatePresence>
          {!roomJoined ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  className="h-auto py-4 sm:py-6 flex flex-col gap-2"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>Create Room</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 sm:py-6 flex flex-col gap-2"
                  onClick={() => setJoinDialogOpen(true)}
                >
                  <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>Join Room</span>
                </Button>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold sm:text-xl">Active Rooms</h2>
                <div className="grid gap-4">
                  {mockRooms.map(room => (
                    <Card key={room.id} className="w-full">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium truncate">{room.name}</h3>
                              {room.isPrivate && <Lock className="h-3 w-3 text-muted-foreground shrink-0" />}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-3 w-3 shrink-0" />
                              <span>{room.members} online</span>
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleJoinRoom(room.id)}
                            className="shrink-0"
                          >
                            Join
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="truncate">
                        {mockRooms.find(r => r.id === roomJoined)?.name || "My Room"}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLeaveRoom}
                      className="shrink-0"
                    >
                      Leave Room
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                      Room Code: <span className="font-mono">XYZ-123-ABC</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      <ActiveMember name="You" isMuted={false} isSpeaking={true} />
                      <ActiveMember name="Alex" isMuted={false} isSpeaking={false} />
                      <ActiveMember name="Sam" isMuted={true} isSpeaking={false} />
                      <ActiveMember name="Jordan" isMuted={false} isSpeaking={true} />
                      <ActiveMember name="Taylor" isMuted={false} isSpeaking={false} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="voice" className="w-full">
                <TabsList className="w-full min-w-[300px] overflow-x-auto">
                  <div className="flex w-full sm:grid sm:grid-cols-3">
                    <TabsTrigger value="voice" className="flex-1">
                      <Music className="h-4 w-4 mr-2" />
                      Voice
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="prank" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Prank
                    </TabsTrigger>
                  </div>
                </TabsList>
                
                <TabsContent value="voice" className="mt-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <p>You are connected to voice chat</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button>
                            Toggle Mute
                          </Button>
                          <Button variant="secondary">
                            Change Voice
                          </Button>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Voice:</span>
                            <select 
                              className="bg-background border rounded px-2 py-1 text-sm"
                              value={selectedVoiceId}
                              onChange={e => setSelectedVoiceId(e.target.value)}
                              aria-label="Select voice effect"
                              title="Voice effect selection"
                              id="voice-effect-select"
                            >
                              {allVoices.map(v => (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Your selected voice effect will apply to chat!
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="chat" className="mt-4">
                  <Card>
                    <CardContent className="p-4 h-60 flex flex-col">
                      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Alex:</span> Hey everyone!
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Sam:</span> What's up?
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">You:</span> Just testing the new app
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Type a message..." />
                        <Button>Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="prank" className="mt-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="mb-4">Choose a member to prank call</p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Call members in this room
                        </Button>
                        <Button className="w-full justify-start" asChild>
                          <a href="/prank-room">
                            <Phone className="h-4 w-4 mr-2" />
                            Go to Prank Room
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Room</DialogTitle>
              <DialogDescription>
                Create a new voice chat room for you and your friends
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="room-name">Room Name</Label>
                <Input 
                  id="room-name" 
                  value={roomName} 
                  onChange={e => setRoomName(e.target.value)} 
                  placeholder="Enter a room name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-password">Password (optional)</Label>
                <Input 
                  id="room-password" 
                  type="password" 
                  value={roomPassword} 
                  onChange={e => setRoomPassword(e.target.value)} 
                  placeholder="Leave blank for public room"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRoom}>
                Create Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join a Room</DialogTitle>
              <DialogDescription>
                Join an existing room using a code or name and password
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="room-code">Room Code</Label>
                <Input 
                  id="room-code" 
                  value={roomCode} 
                  onChange={e => setRoomCode(e.target.value)} 
                  placeholder="Enter room code"
                />
              </div>
              <div className="flex items-center">
                <div className="flex-1 border-b border-border"></div>
                <span className="px-2 text-xs text-muted-foreground">OR</span>
                <div className="flex-1 border-b border-border"></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-name-join">Room Name</Label>
                <Input 
                  id="room-name-join" 
                  value={roomName} 
                  onChange={e => setRoomName(e.target.value)} 
                  placeholder="Enter room name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-password-join">Password</Label>
                <Input 
                  id="room-password-join" 
                  type="password" 
                  value={roomPassword} 
                  onChange={e => setRoomPassword(e.target.value)} 
                  placeholder="Enter password if required"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleJoinRoom("r1")}>
                Join Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function ActiveMember({ name, isMuted, isSpeaking }: { name: string, isMuted: boolean, isSpeaking: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center text-white font-medium",
        isSpeaking ? "bg-primary" : "bg-secondary"
      )}>
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm mt-1 truncate w-full text-center">{name}</span>
      {isMuted && (
        <span className="text-xs text-muted-foreground truncate w-full text-center">
          Muted
        </span>
      )}
    </div>
  );
}
