import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface UsernameModalProps {
  onUsernameSet: (username: string) => void;
}

const UsernameModal = ({ onUsernameSet }: UsernameModalProps) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      setOpen(true);
    } else {
      onUsernameSet(storedUsername);
    }
  }, [onUsernameSet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username.trim());
      onUsernameSet(username.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl md:text-2xl">Welcome to NextGen Studio! 👋</DialogTitle>
          <DialogDescription className="text-center text-sm md:text-base">
            What should we call you? We'll use this to personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-center text-base"
            autoFocus
          />
          <Button type="submit" className="w-full" disabled={!username.trim()}>
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameModal;