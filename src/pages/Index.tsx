import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (theme: string, tone: string, platform: string): Promise<string> => {
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
          return "";
        }
        
        if (response.status === 402) {
          toast.error("AI credits depleted. Please contact support.");
          return "";
        }
        
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();
      
      // Format the response as markdown with proper formatting
      const formattedResponse = `
## 📝 Video Script

${data.script}

---

## ✨ Title

**${data.title}**

---

## 📄 Description

${data.description}

---

## 🏷️ Tags

${data.tags.map((tag: string) => `\`${tag}\``).join(", ")}

---

## #️⃣ Hashtags

${data.hashtags.join(" ")}

---

## 🖼️ Thumbnail Idea

${data.thumbnailIdea}

---

*💡 Tip: Click the copy button to copy any section, or use the sections above to craft your content!*
`;
      
      toast.success("Content generated successfully!");
      return formattedResponse;
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate content");
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI-Powered Creative Studio
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Professional content generation powered by Gemini AI. Get scripts, titles, and more in seconds.
            </p>
          </div>

          <ChatInterface onGenerate={handleGenerate} isLoading={isLoading} />
          
          <div className="mt-16">
            <AboutSection />
          </div>
        </main>

        <footer className="w-full py-6 px-4 border-t border-border/30 backdrop-blur-xl">
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
