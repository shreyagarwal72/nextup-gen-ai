import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 px-4 backdrop-blur-xl bg-card/30 border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20" />
            <Sparkles className="w-8 h-8 text-primary relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NextGen Studio Tools
            </h1>
            <p className="text-xs text-muted-foreground">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
