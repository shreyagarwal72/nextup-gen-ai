import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser?: boolean;
}

const ChatMessage = ({ content, isUser = false }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div
      className={cn(
        "flex w-full gap-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-6 py-4 relative group",
          isUser
            ? "bg-primary text-primary-foreground ml-auto"
            : "bg-card/60 backdrop-blur-xl border border-border/50"
        )}
      >
        {!isUser && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
        
        <div className={cn(
          "prose prose-sm max-w-none",
          isUser ? "prose-invert" : "prose-slate dark:prose-invert"
        )}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-bold mb-3 text-foreground">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mb-2 text-foreground">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold mb-2 text-foreground">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 leading-relaxed text-foreground/90 last:mb-0">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-primary">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-foreground/80">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-foreground/90">{children}</li>
              ),
              code: ({ inline, children, ...props }: any) =>
                inline ? (
                  <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block p-3 rounded-lg bg-muted/50 font-mono text-sm overflow-x-auto" {...props}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre className="mb-3 overflow-x-auto">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 mb-3">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
