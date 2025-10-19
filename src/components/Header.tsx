import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sparkles className="w-7 h-7 text-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            NextGen Studio Tools
          </h1>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
