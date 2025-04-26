import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist] = useState([
    { id: 1, title: "Song 1", artist: "Singer 1" },
    { id: 2, title: "Song 2", artist: "Singer 2" },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const navigate = useNavigate();

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const previousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };

  const handleSingerSelection = () => {
    alert("Spotify integration coming soon! Select a singer and their playlist.");
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create Music</h1>
      </header>

      {/* Music Player Section */}
      <Card className="mb-6 bg-gray-700">
        <CardContent className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">
            Now Playing: {playlist[currentSongIndex].title} by {playlist[currentSongIndex].artist}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={previousSong}>
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="outline" size="icon" onClick={nextSong}>
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Singers Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Popular Singers</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600"
            onClick={handleSingerSelection}
          >
            Add Singer from Spotify
          </Button>
        </div>
      </div>

      {/* Lyrics Creator Button */}
      <Button
        className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 rounded-lg hover:from-green-500 hover:to-blue-600"
        onClick={() => navigate("/lyrics-creator")}
      >
        Open Lyrics Creator
      </Button>
    </div>
  );
}