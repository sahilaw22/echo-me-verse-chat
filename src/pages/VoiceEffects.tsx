import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Pause, Download, Check } from "lucide-react";
import { cn, layoutClasses } from "@/lib/utils";

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

interface Effect {
  id: string;
  name: string;
  category: string;
  downloads: number;
  isFavorite: boolean;
}

interface EffectCardProps {
  effect: Effect;
  isPlaying: boolean;
  isApplied: boolean;
  onPlay: () => void;
  onApply: () => void;
}

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
    <div className={cn(
      layoutClasses.pageWrapper,
      "overflow-x-hidden"
    )}>
      <div className={layoutClasses.mainContent}>
        <header className={cn(
          layoutClasses.flexBetween,
          "mb-6 flex-wrap gap-4"
        )}>
          <h1 className="text-2xl font-bold sm:text-3xl">Voice Effects</h1>
        </header>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search voice effects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="w-full min-w-[300px] overflow-x-auto">
            <div className="flex w-full sm:grid sm:grid-cols-5">
              <TabsTrigger value="all" aria-label="Show all voice effects" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="character" aria-label="Show character voice effects" className="flex-1">Character</TabsTrigger>
              <TabsTrigger value="creator" aria-label="Show creator voice effects" className="flex-1">Creator</TabsTrigger>
              <TabsTrigger value="meme" aria-label="Show meme voice effects" className="flex-1">Meme</TabsTrigger>
              <TabsTrigger value="favorites" aria-label="Show favorite voice effects" className="flex-1">⭐</TabsTrigger>
            </div>
          </TabsList>
        </Tabs>
        
        <div className={cn(
          layoutClasses.grid,
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}>
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
    </div>
  );
}

function EffectCard({ effect, isPlaying, isApplied, onPlay, onApply }: EffectCardProps) {
  // Assign a color/gradient based on effect category for vibrancy
  const colorMap: Record<string, string> = {
    character: "from-purple-600 to-blue-600",
    creator: "from-pink-500 to-orange-400",
    meme: "from-fuchsia-500 to-pink-500",
    effect: "from-blue-600 to-purple-600",
    default: "from-amber-500 to-yellow-400",
  };
  const shadowMap: Record<string, string> = {
    character: "shadow-purple-500/30",
    creator: "shadow-pink-500/30",
    meme: "shadow-fuchsia-500/30",
    effect: "shadow-blue-500/30",
    default: "shadow-amber-500/30",
  };
  const color = colorMap[effect.category] || colorMap.default;
  const shadow = shadowMap[effect.category] || shadowMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className={cn(
        "glass-morphism h-full group border border-gray-800 transition-all duration-300 hover:shadow-xl hover:border-transparent hover:bg-gradient-to-br",
        `hover:${color}`,
        isApplied && "border-primary"
      )}>
        <CardContent className="p-5 flex flex-col h-full gap-3">
          <div className="flex flex-col gap-2 h-full">
            {/* Header section */}
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base mb-1 text-white drop-shadow-lg truncate">{effect.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-300 opacity-80 truncate">
                    {effect.downloads.toLocaleString()} downloads
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {effect.category}
              </Badge>
            </div>
            {/* Actions section - pushed to bottom with flex */}
            <div className="mt-auto pt-2">
              <div className="grid grid-cols-12 gap-2">
                {/* Preview button */}
                <Button
                  variant="default"
                  size="sm"
                  className={cn("col-span-5 h-8 w-full font-semibold text-xs shadow-md transition-all", shadow)}
                  onClick={onPlay}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3 mr-1 shrink-0" />
                      <span className="truncate">Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1 shrink-0" />
                      <span className="truncate">Preview</span>
                    </>
                  )}
                </Button>
                {/* Apply button */}
                <Button
                  variant={isApplied ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "col-span-5 h-8 w-full font-semibold text-xs transition-all",
                    isApplied ? shadow : "border-gray-700 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white"
                  )}
                  onClick={onApply}
                >
                  {isApplied ? (
                    <>
                      <Check className="h-3 w-3 mr-1 shrink-0" />
                      <span className="truncate">Applied</span>
                    </>
                  ) : (
                    <span className="truncate">Apply</span>
                  )}
                </Button>
                {/* Download button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="col-span-2 h-8 w-full px-0 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600"
                  title="Download voice effect"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
