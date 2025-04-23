
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
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-gradient-to-br from-[#FEF7CD] via-[#FEC6A1] to-[#F97316]">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-600 drop-shadow-md">My Library</h1>
      </header>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 h-4 w-4" />
        <Input
          placeholder="Search voices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-white/70 border-yellow-300 focus:border-orange-400 focus:ring-orange-300 transition"
        />
      </div>
      
      <Tabs defaultValue="effects" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-orange-200 rounded-lg shadow-sm">
          <TabsTrigger 
            value="effects" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-300 data-[state=active]:to-orange-300 data-[state=active]:text-orange-900"
          >
            Voice Effects
          </TabsTrigger>
          <TabsTrigger 
            value="clones" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-300 data-[state=active]:to-orange-300 data-[state=active]:text-orange-900"
          >
            Cloned Voices
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="effects" className="mt-4">
          <div className="space-y-3">
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No voice effects found</p>
                <Button 
                  asChild 
                  className="mt-4 bg-orange-400 hover:bg-orange-500 text-white shadow"
                >
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
                <Button 
                  asChild 
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-orange-900 shadow"
                >
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
  // Assign a color based on type for accent: effects=yellow, clones=orange
  const accent =
    voice.type === "effect"
      ? "bg-gradient-to-r from-yellow-100 to-yellow-300"
      : "bg-gradient-to-r from-orange-100 to-orange-300";

  const accentText =
    voice.type === "effect" ? "text-yellow-900" : "text-orange-900";

  const playBtn =
    voice.type === "effect"
      ? "bg-yellow-200 hover:bg-yellow-300 text-yellow-900"
      : "bg-orange-200 hover:bg-orange-300 text-orange-900";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`${accent} border-0 shadow-sm`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className={`font-medium ${accentText}`}>{voice.name}</h3>
              <p className="text-xs text-muted-foreground">
                Used {voice.usageCount} times
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPlay}
                className={`h-8 w-8 ${playBtn} transition`}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-400 hover:bg-orange-50">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2 text-yellow-400" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2 text-orange-400" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2 text-yellow-500" />
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
