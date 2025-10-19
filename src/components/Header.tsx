import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

interface HeaderProps {
  username?: string;
}

const Header = ({ username }: HeaderProps) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto max-w-7xl px-3 md:px-4 h-14 md:h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-foreground shrink-0" />
          <div className="min-w-0">
            <h1 className="text-sm md:text-xl font-bold text-foreground truncate">
              <span className="hidden sm:inline">NextGen Studio Tools</span>
              <span className="sm:hidden">NextGen</span>
            </h1>
            {username && (
              <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                {greeting}, {username}! 👋
              </p>
            )}
          </div>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
