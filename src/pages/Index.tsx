import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import CookieConsent from "@/components/CookieConsent";
import UsernameModal from "@/components/UsernameModal";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>("");

  const handleGenerate = async (theme: string, tone: string, contentType: string): Promise<string> => {
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
          body: JSON.stringify({ theme, tone, contentType }),
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
      
      // Format response based on content type
      let formattedResponse = "";
      
      if (contentType === "all") {
        formattedResponse = `
## 📝 Script

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
`;
      } else if (contentType === "title") {
        formattedResponse = `## ✨ Title\n\n**${data.title}**`;
      } else if (contentType === "description") {
        formattedResponse = `## 📄 Description\n\n${data.description}`;
      } else if (contentType === "tags") {
        formattedResponse = `## 🏷️ Tags\n\n${data.tags.map((tag: string) => `\`${tag}\``).join(", ")}`;
      } else if (contentType === "hashtags") {
        formattedResponse = `## #️⃣ Hashtags\n\n${data.hashtags.join(" ")}`;
      } else if (contentType === "thumbnail") {
        formattedResponse = `## 🖼️ Thumbnail Idea\n\n${data.thumbnailIdea}`;
      } else if (contentType === "script") {
        formattedResponse = `## 📝 Script\n\n${data.script}`;
      }
      
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
    <div className="min-h-screen flex flex-col animated-bg overflow-hidden">
      <UsernameModal onUsernameSet={setUsername} />
      <CookieConsent />
      <Header username={username} />
      
      <main className="flex-1 container mx-auto max-w-7xl h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] overflow-hidden">
        <ChatInterface onGenerate={handleGenerate} isLoading={isLoading} />
      </main>

      <footer className="py-2 md:py-3 px-3 md:px-4 border-t border-border bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-[10px] md:text-xs text-muted-foreground">
            © 2025 Nextup Studio — Created by Vanshu
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
