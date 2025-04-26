import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LyricsCreator() {
  const [lyrics, setLyrics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  const generateSong = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Song generated and playing!");
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lyrics Creator</h1>
      </header>

      <Card className="mb-6 bg-gray-700">
        <CardContent className="flex flex-col gap-4">
          <textarea
            placeholder="Write your lyrics here..."
            value={lyrics}
            onChange={handleLyricsChange}
            className="w-full h-40 p-4 border rounded-md bg-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={generateSong}
            disabled={isGenerating}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 rounded-lg hover:from-green-500 hover:to-blue-600"
          >
            {isGenerating ? "Generating..." : "Generate Song"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}