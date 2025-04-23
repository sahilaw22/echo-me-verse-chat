
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Mic, Upload, Play, Pause, Square, Trash2, Save, Library } from "lucide-react";

type VoiceCloneType = { id: string; name: string; duration: number; };

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function VoiceClone() {
  const [activeTab, setActiveTab] = useState("record");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<null | { name: string, duration: number }>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [voiceName, setVoiceName] = useState("");
  // --- NEW: saved voices state ---
  const [savedVoices, setSavedVoices] = useState<VoiceCloneType[]>([]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          clearInterval(interval);
          setIsRecording(false);
          setRecordedAudio({ name: "New Recording", duration: 30 });
          setSaveDialogOpen(true);
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTime >= 3) {
      setRecordedAudio({ name: "New Recording", duration: recordingTime });
      setSaveDialogOpen(true);
    } else {
      setRecordingTime(0);
    }
  };
  
  const handleSaveVoice = () => {
    setSaveDialogOpen(false);
    if (recordedAudio) {
      // Add new voice clone to the list (append)
      setSavedVoices((prev) => [
        ...prev, 
        {
          id: generateId(),
          name: voiceName || "My Voice Clone",
          duration: recordedAudio.duration
        }
      ]);
      setVoiceName("");
      setRecordedAudio(null); // Reset main view for next recording
      setRecordingTime(0);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDelete = () => {
    setRecordedAudio(null);
    setRecordingTime(0);
  };

  // -- REMOVE clone from list --
  const removeSavedVoice = (id: string) => {
    setSavedVoices(voices => voices.filter(voice => voice.id !== id));
  };

  // -- EDIT name (simple) --
  const editSavedVoice = (id: string, newName: string) => {
    setSavedVoices(voices =>
      voices.map(voice => (voice.id === id ? { ...voice, name: newName } : voice))
    );
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-24">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Voice Cloning</h1>
        <Button variant="ghost" asChild>
          <a href="/library" title="Go to Library">
            <Library className="w-6 h-6 mr-2" />
            Library
          </a>
        </Button>
      </header>
      
      <Tabs defaultValue="record" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record">Record Voice</TabsTrigger>
          <TabsTrigger value="upload">Upload Audio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="record" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Record Your Voice</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {!recordedAudio ? (
                <>
                  <motion.div 
                    className={`w-28 h-28 rounded-full flex items-center justify-center ${
                      isRecording ? 'bg-red-500' : 'bg-primary'
                    }`}
                    animate={isRecording ? { scale: [1, 1.05, 1] } : {}}
                    transition={isRecording ? { repeat: Infinity, duration: 1 } : {}}
                  >
                    <Mic className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <div className="text-center">
                    {isRecording ? (
                      <div className="mb-4">
                        <p className="text-lg font-semibold">Recording...</p>
                        <p className="text-sm text-muted-foreground">Say something for at least 30 seconds</p>
                        <p className="text-xl mt-2">{recordingTime}s / 30s</p>
                        <Progress value={(recordingTime / 30) * 100} className="mt-2" />
                      </div>
                    ) : (
                      <p className="mb-4 text-muted-foreground">Tap to start recording your voice</p>
                    )}
                    
                    <Button 
                      size="lg" 
                      variant={isRecording ? "destructive" : "default"}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? (
                        <>
                          <Square className="mr-2 h-4 w-4" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4" />
                          Start Recording
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{recordedAudio.name}</h3>
                    <span className="text-sm text-muted-foreground">{recordedAudio.duration}s</span>
                  </div>
                  
                  <div className="bg-accent rounded-md h-12 mb-4"></div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant={isPlaying ? "secondary" : "default"} 
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setSaveDialogOpen(true)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground text-center px-6">
              For best results, use a quiet environment and speak clearly for the full 30 seconds.
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Upload Audio File</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-10 w-full text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="mb-2">Drag and drop your audio file</p>
                <p className="text-sm text-muted-foreground mb-4">MP3, WAV, or M4A (max 10MB)</p>
                <Button>Select File</Button>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground text-center px-6">
              For best results, upload a clear recording that's at least 30 seconds long.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Voice Clone</DialogTitle>
            <DialogDescription>
              Give your voice clone a name to save it to your library
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="voice-name">Voice Name</Label>
            <Input 
              id="voice-name"
              placeholder="e.g. My Voice" 
              value={voiceName} 
              onChange={e => setVoiceName(e.target.value)}
              className="mt-1"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVoice}>
              Save Voice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List of saved voices */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Library className="h-5 w-5" />
          Saved Voices
        </h2>
        {savedVoices.length === 0 ? (
          <div className="text-muted-foreground text-sm mb-4">
            No voices saved yet. Record and save your first clone!
          </div>
        ) : (
          <div className="space-y-3">
            {savedVoices.map((voice) => (
              <Card key={voice.id} className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center flex-1">
                  <div className="rounded-full w-10 h-10 bg-primary text-white flex items-center justify-center mr-3">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{voice.name}</div>
                    <div className="text-xs text-muted-foreground">{voice.duration}s</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* Play/Stop (simulate) */}
                  <Button variant="outline" size="icon" onClick={() => {}}>
                    <Play className="h-4 w-4" />
                  </Button>
                  {/* Edit Name */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const name = prompt("Rename voice", voice.name);
                      if (name) editSavedVoice(voice.id, name);
                    }}
                    title="Rename"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  {/* Delete */}
                  <Button variant="destructive" size="icon" onClick={() => removeSavedVoice(voice.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
