import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, RotateCcw, Settings2, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { cn } from "@/lib/utils";

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
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: theme,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setTheme("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

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
    setShowOptions(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTheme(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-140px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6 max-w-2xl animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-muted/50 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Welcome to NextGen Studio</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Your AI-powered creative assistant for generating professional content ideas, scripts, and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 rounded-xl border border-border bg-card/50">
                    <div className="font-medium mb-1">📝 Scripts</div>
                    <div className="text-muted-foreground text-xs">Professional video scripts</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card/50">
                    <div className="font-medium mb-1">✨ Titles & Tags</div>
                    <div className="text-muted-foreground text-xs">SEO-optimized content</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card/50">
                    <div className="font-medium mb-1">🎨 Descriptions</div>
                    <div className="text-muted-foreground text-xs">Engaging descriptions</div>
                  </div>
                </div>
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
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <span className="text-sm">Generating content...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-4xl px-3 md:px-4 py-3 md:py-4">
          {/* Options Bar */}
          <div className={cn(
            "mb-2 md:mb-3 transition-all duration-300 overflow-hidden",
            showOptions ? "max-h-24 md:max-h-20 opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="flex gap-2 flex-wrap pb-2 md:pb-3">
              <Select value={tone} onValueChange={setTone} disabled={isLoading}>
                <SelectTrigger className="w-[130px] md:w-[140px] h-8 md:h-9 text-xs md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="funny">😄 Funny</SelectItem>
                  <SelectItem value="emotional">💙 Emotional</SelectItem>
                  <SelectItem value="cinematic">🎬 Cinematic</SelectItem>
                  <SelectItem value="motivational">💪 Motivational</SelectItem>
                  <SelectItem value="educational">📚 Educational</SelectItem>
                  <SelectItem value="professional">💼 Professional</SelectItem>
                  <SelectItem value="casual">😎 Casual</SelectItem>
                  <SelectItem value="dramatic">🎭 Dramatic</SelectItem>
                  <SelectItem value="inspirational">✨ Inspirational</SelectItem>
                  <SelectItem value="informative">ℹ️ Informative</SelectItem>
                </SelectContent>
              </Select>

              <Select value={platform} onValueChange={setPlatform} disabled={isLoading}>
                <SelectTrigger className="w-[130px] md:w-[140px] h-8 md:h-9 text-xs md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YouTube">📺 YouTube</SelectItem>
                  <SelectItem value="Shorts">🎥 Shorts</SelectItem>
                  <SelectItem value="Instagram">📸 Instagram</SelectItem>
                  <SelectItem value="TikTok">🎵 TikTok</SelectItem>
                  <SelectItem value="Facebook">👥 Facebook</SelectItem>
                  <SelectItem value="Twitter">🐦 Twitter/X</SelectItem>
                  <SelectItem value="LinkedIn">💼 LinkedIn</SelectItem>
                  <SelectItem value="Pinterest">📌 Pinterest</SelectItem>
                  <SelectItem value="Blog">📝 Blog</SelectItem>
                </SelectContent>
              </Select>

              {messages.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="h-8 md:h-9 ml-auto text-xs md:text-sm"
                >
                  <RotateCcw className="w-3 md:w-3.5 h-3 md:h-3.5 mr-1 md:mr-1.5" />
                  <span className="hidden sm:inline">New Chat</span>
                  <span className="sm:hidden">New</span>
                </Button>
              )}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-1.5 md:gap-2 items-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowOptions(!showOptions)}
              className="shrink-0 mb-1 h-9 w-9 md:h-10 md:w-10"
            >
              <Settings2 className="w-4 md:w-5 h-4 md:h-5" />
            </Button>

            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={theme}
                onChange={handleTextareaChange}
                placeholder="Describe your content idea..."
                className="min-h-[44px] md:min-h-[48px] max-h-[200px] resize-none pr-12 py-2.5 md:py-3 text-sm md:text-base"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !theme.trim()}
              size="icon"
              className="shrink-0 h-[44px] w-[44px] md:h-[48px] md:w-[48px] rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" />
              ) : (
                <Send className="w-4 md:w-5 h-4 md:h-5" />
              )}
            </Button>
          </form>

          <p className="text-[10px] md:text-xs text-muted-foreground text-center mt-1.5 md:mt-2">
            <span className="hidden sm:inline">Press Enter to send • Shift + Enter for new line</span>
            <span className="sm:hidden">Enter to send • Shift+Enter for new line</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
