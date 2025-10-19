import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ContentResult {
  script: string;
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  thumbnailIdea: string;
}

interface ResultsDisplayProps {
  results: ContentResult | null;
  onSave: () => void;
}

const ResultsDisplay = ({ results, onSave }: ResultsDisplayProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!results) return null;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const ResultCard = ({ title, content, field }: { title: string; content: string; field: string }) => (
    <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-6 animate-scale-in hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(content, field)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copiedField === field ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mt-12 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Your Generated Content
        </h2>
        <Button
          onClick={onSave}
          variant="outline"
          className="border-primary/50 hover:bg-primary/10"
        >
          Save to My Ideas
        </Button>
      </div>

      <div className="grid gap-6">
        <ResultCard title="📝 Script" content={results.script} field="script" />
        
        <ResultCard title="✨ Title" content={results.title} field="title" />
        
        <ResultCard title="📄 Description" content={results.description} field="description" />
        
        <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-6 animate-scale-in hover:border-primary/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">🏷️ Tags</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(results.tags.join(", "), "tags")}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedField === "tags" ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-6 animate-scale-in hover:border-primary/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">#️⃣ Hashtags</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(results.hashtags.join(" "), "hashtags")}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedField === "hashtags" ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.hashtags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-sm text-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ResultCard title="🖼️ Thumbnail Idea" content={results.thumbnailIdea} field="thumbnail" />
      </div>
    </div>
  );
};

export default ResultsDisplay;
