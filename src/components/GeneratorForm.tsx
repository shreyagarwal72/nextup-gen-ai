import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";

interface GeneratorFormProps {
  onGenerate: (theme: string, tone: string, platform: string) => Promise<void>;
  isLoading: boolean;
}

const GeneratorForm = ({ onGenerate, isLoading }: GeneratorFormProps) => {
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState("funny");
  const [platform, setPlatform] = useState("YouTube");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim()) {
      await onGenerate(theme, tone, platform);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-6 shadow-[var(--shadow-card)] hover:border-primary/30 transition-all duration-300">
        <label className="block text-sm font-medium mb-3 text-foreground/90">
          What's your content idea?
        </label>
        <Textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g., Minecraft funny short, emotional love story, tech review..."
          className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 transition-all resize-none text-base"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
          <label className="block text-sm font-medium mb-3 text-foreground/90">
            Tone
          </label>
          <Select value={tone} onValueChange={setTone} disabled={isLoading}>
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-xl bg-popover/95 border-border/50">
              <SelectItem value="funny">😄 Funny</SelectItem>
              <SelectItem value="emotional">💙 Emotional</SelectItem>
              <SelectItem value="cinematic">🎬 Cinematic</SelectItem>
              <SelectItem value="motivational">💪 Motivational</SelectItem>
              <SelectItem value="educational">📚 Educational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
          <label className="block text-sm font-medium mb-3 text-foreground/90">
            Platform
          </label>
          <Select value={platform} onValueChange={setPlatform} disabled={isLoading}>
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-xl bg-popover/95 border-border/50">
              <SelectItem value="YouTube">📺 YouTube</SelectItem>
              <SelectItem value="Shorts">🎥 Shorts</SelectItem>
              <SelectItem value="Instagram">📸 Instagram</SelectItem>
              <SelectItem value="TikTok">🎵 TikTok</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !theme.trim()}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[var(--shadow-glow)] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Ideas
          </>
        )}
      </Button>
    </form>
  );
};

export default GeneratorForm;
