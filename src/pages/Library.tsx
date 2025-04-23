
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Play, Pause, MoreVertical, Download, Edit, Share2, Trash2 } from "lucide-react";

// Mock data for voice effects and cloned voices
const mockVoiceEffects = [
  { id: "1", name: "Robot Voice", type: "effect", usageCount: 23 },
  { id: "2", name: "Chipmunk", type: "effect", usageCount: 15 },
  { id: "3", name: "Echo Chamber", type: "effect", usageCount: 8 },
  { id: "4", name: "Deep Voice", type: "effect", usageCount: 19 },
];

const mockClonedVoices = [
  { id: "1", name: "Friend 1", type: "clone", usageCount: 12 },
  { id: "2", name: "Friend 2", type: "clone", usageCount: 7 },
  { id: "3", name: "Celebrity", type: "clone", usageCount: 31 },
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("effects");
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const data = activeTab === "effects" ? mockVoiceEffects : mockClonedVoices;
  
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Library</h1>
      </header>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search voices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Tabs defaultValue="effects" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="effects">Voice Effects</TabsTrigger>
          <TabsTrigger value="clones">Cloned Voices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="effects" className="mt-4">
          <div className="space-y-3">
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No voice effects found</p>
                <Button asChild className="mt-4">
                  <a href="/voice-effects">Explore Voice Effects</a>
                </Button>
              </div>
            ) : (
              filteredData.map((voice) => (
                <VoiceCard 
                  key={voice.id} 
                  voice={voice} 
                  isPlaying={playingId === voice.id}
                  onPlay={() => handlePlay(voice.id)}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="clones" className="mt-4">
          <div className="space-y-3">
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No cloned voices found</p>
                <Button asChild className="mt-4">
                  <a href="/voice-clone">Create Voice Clone</a>
                </Button>
              </div>
            ) : (
              filteredData.map((voice) => (
                <VoiceCard 
                  key={voice.id} 
                  voice={voice} 
                  isPlaying={playingId === voice.id}
                  onPlay={() => handlePlay(voice.id)}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function VoiceCard({ voice, isPlaying, onPlay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{voice.name}</h3>
              <p className="text-xs text-muted-foreground">
                Used {voice.usageCount} times
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPlay}
                className="h-8 w-8"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
