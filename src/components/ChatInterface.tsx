import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, RotateCcw } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onGenerate: (theme: string, tone: string, platform: string) => Promise<string>;
  isLoading: boolean;
}

const ChatInterface = ({ onGenerate, isLoading }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [theme, setTheme] = useState("");
  const [tone, setTone] = useState("funny");
  const [platform, setPlatform] = useState("YouTube");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: `Generate content for: **${theme}**\n\n- Tone: ${tone}\n- Platform: ${platform}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setTheme("");

    const response = await onGenerate(theme, tone, platform);
    
    if (response) {
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setTheme("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 px-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start Creating</h3>
                <p className="text-muted-foreground max-w-md">
                  Enter your content idea below and let our AI generate professional scripts, titles, and more.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isUser={message.role === "user"}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>NextGen AI is thinking...</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 backdrop-blur-xl bg-background/80 border-t border-border/50 pt-4 pb-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Options Bar */}
          <div className="flex gap-3 flex-wrap">
            <Select value={tone} onValueChange={setTone} disabled={isLoading}>
              <SelectTrigger className="w-[160px] bg-card/60 border-border/50">
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

            <Select value={platform} onValueChange={setPlatform} disabled={isLoading}>
              <SelectTrigger className="w-[160px] bg-card/60 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-xl bg-popover/95 border-border/50">
                <SelectItem value="YouTube">📺 YouTube</SelectItem>
                <SelectItem value="Shorts">🎥 Shorts</SelectItem>
                <SelectItem value="Instagram">📸 Instagram</SelectItem>
                <SelectItem value="TikTok">🎵 TikTok</SelectItem>
              </SelectContent>
            </Select>

            {messages.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="ml-auto"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            )}
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <Textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Describe your content idea... (e.g., Minecraft funny short, tech review)"
              className="min-h-[56px] max-h-[200px] bg-card/60 border-border/50 focus:border-primary/50 transition-all resize-none"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              disabled={isLoading || !theme.trim()}
              size="icon"
              className="h-[56px] w-[56px] shrink-0 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
