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
import { cn } from "@/lib/utils";

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

function VoiceCard({ voice, isPlaying, onPlay }: { voice: { id: string; name: string; type: string; usageCount: number }, isPlaying: boolean, onPlay: () => void }) {
  // Assign a color/gradient based on type for vibrancy
  const colorMap: Record<string, string> = {
    effect: "from-purple-600 to-blue-600",
    clone: "from-pink-500 to-orange-400",
    default: "from-amber-500 to-yellow-400",
  };
  const shadowMap: Record<string, string> = {
    effect: "shadow-purple-500/30",
    clone: "shadow-pink-500/30",
    default: "shadow-amber-500/30",
  };
  const color = colorMap[voice.type] || colorMap.default;
  const shadow = shadowMap[voice.type] || shadowMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "glass-morphism group border border-gray-800 transition-all duration-300 hover:shadow-xl hover:border-transparent hover:bg-gradient-to-br",
        `hover:${color}`
      )}>
        <CardContent className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
              color, shadow
            )}>
              {voice.type === "effect" ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base mb-1 text-white drop-shadow-lg truncate">{voice.name}</h3>
              <p className="text-xs text-gray-300 opacity-80 truncate">Used {voice.usageCount} times</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="icon"
              onClick={onPlay}
              className={cn("h-10 w-10 shadow-md transition-all", shadow)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600">
                  <MoreVertical className="h-5 w-5" />
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
        </CardContent>
      </Card>
    </motion.div>
  );
}
