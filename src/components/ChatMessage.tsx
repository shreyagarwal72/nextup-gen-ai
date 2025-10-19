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
        "flex w-full gap-3 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-5 py-3 relative group",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/50 border border-border/50"
        )}
      >
        {!isUser && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        )}
        
        <div className={cn(
          "prose prose-sm max-w-none",
          isUser ? "prose-invert" : "dark:prose-invert"
        )}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-lg font-bold mb-2 text-foreground">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-base font-semibold mb-2 text-foreground">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold mb-2 text-foreground">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-2 leading-relaxed text-foreground/90 last:mb-0 text-sm">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-foreground/80">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2 space-y-0.5 text-sm">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2 space-y-0.5 text-sm">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-foreground/90">{children}</li>
              ),
              code: ({ inline, children, ...props }: any) =>
                inline ? (
                  <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block p-3 rounded-lg bg-muted font-mono text-xs overflow-x-auto my-2" {...props}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre className="mb-2 overflow-x-auto">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-3 border-foreground/30 pl-3 italic text-foreground/70 mb-2 text-sm">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="my-3 border-border/50" />
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
