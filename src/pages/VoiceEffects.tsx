
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Pause, Download, Check } from "lucide-react";

// Mock data for voice effects
const mockVoiceEffects = [
  {
    id: "1",
    name: "Robot Voice",
    category: "character",
    downloads: 1245,
    isFavorite: false,
  },
  {
    id: "2",
    name: "Chipmunk",
    category: "character",
    downloads: 986,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Echo Chamber",
    category: "effect",
    downloads: 782,
    isFavorite: false,
  },
  {
    id: "4",
    name: "Deep Voice",
    category: "character",
    downloads: 1456,
    isFavorite: false,
  },
  {
    id: "5",
    name: "Movie Trailer",
    category: "character",
    downloads: 1823,
    isFavorite: false,
  },
  {
    id: "6",
    name: "Helium",
    category: "effect",
    downloads: 678,
    isFavorite: false,
  },
  {
    id: "7",
    name: "PewDiePie",
    category: "creator",
    downloads: 2100,
    isFavorite: true,
  },
  {
    id: "8",
    name: "MrBeast",
    category: "creator",
    downloads: 2543,
    isFavorite: false,
  },
  {
    id: "9",
    name: "Morgan Freeman",
    category: "character",
    downloads: 1876,
    isFavorite: false,
  },
  {
    id: "10",
    name: "Darth Vader",
    category: "character",
    downloads: 2654,
    isFavorite: false,
  },
  {
    id: "11",
    name: "Meme Review",
    category: "meme",
    downloads: 985,
    isFavorite: false,
  },
  {
    id: "12",
    name: "TikTok Voice",
    category: "meme",
    downloads: 1576,
    isFavorite: false,
  },
];

export default function VoiceEffects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [appliedEffect, setAppliedEffect] = useState<string | null>(null);
  
  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const handleApply = (id: string) => {
    setAppliedEffect(id);
  };

  const getFilteredEffects = () => {
    let filtered = mockVoiceEffects;
    
    if (activeTab !== "all") {
      filtered = filtered.filter(effect => 
        activeTab === "favorites" ? effect.isFavorite : effect.category === activeTab
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(effect => 
        effect.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredEffects = getFilteredEffects();

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Voice Effects</h1>
      </header>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search voice effects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="character">Character</TabsTrigger>
          <TabsTrigger value="creator">Creator</TabsTrigger>
          <TabsTrigger value="meme">Meme</TabsTrigger>
          <TabsTrigger value="favorites">⭐</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-2 gap-3">
        {filteredEffects.map((effect) => (
          <EffectCard 
            key={effect.id}
            effect={effect}
            isPlaying={playingId === effect.id}
            isApplied={appliedEffect === effect.id}
            onPlay={() => handlePlay(effect.id)}
            onApply={() => handleApply(effect.id)}
          />
        ))}
      </div>
      
      {filteredEffects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No voice effects found</p>
        </div>
      )}
    </div>
  );
}

function EffectCard({ effect, isPlaying, isApplied, onPlay, onApply }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={isApplied ? "border-primary" : ""}>
        <CardContent className="p-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{effect.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {effect.downloads.toLocaleString()} downloads
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {effect.category}
              </Badge>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 h-8"
                onClick={onPlay}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3 w-3 mr-1" /> 
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1" /> 
                    Preview
                  </>
                )}
              </Button>
              
              <Button
                variant={isApplied ? "default" : "outline"}
                size="sm"
                className="flex-1 h-8"
                onClick={onApply}
              >
                {isApplied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" /> 
                    Applied
                  </>
                ) : (
                  'Apply'
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
