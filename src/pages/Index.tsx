import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import GeneratorForm from "@/components/GeneratorForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import AboutSection from "@/components/AboutSection";

interface ContentResult {
  script: string;
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  thumbnailIdea: string;
}

const Index = () => {
  const [results, setResults] = useState<ContentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (theme: string, tone: string, platform: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ theme, tone, platform }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
          return;
        }
        
        if (response.status === 402) {
          toast.error("AI credits depleted. Please contact support.");
          return;
        }
        
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();
      setResults(data);
      toast.success("Content generated successfully!");
      
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!results) return;
    
    try {
      const savedIdeas = JSON.parse(localStorage.getItem("savedIdeas") || "[]");
      const newIdea = {
        ...results,
        savedAt: new Date().toISOString(),
      };
      savedIdeas.unshift(newIdea);
      localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas.slice(0, 20))); // Keep last 20
      toast.success("Saved to your ideas!");
    } catch (error) {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI-Powered Creative Studio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into professional content with the power of Gemini AI.
              Scripts, titles, tags, and more — all in seconds.
            </p>
          </div>

          <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          
          <ResultsDisplay results={results} onSave={handleSave} />
          
          <AboutSection />
        </main>

        <footer className="w-full py-8 px-4 mt-16 border-t border-border/30 backdrop-blur-xl">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Nextup Studio — Powered by Gemini AI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
