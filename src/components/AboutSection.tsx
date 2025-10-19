import { Sparkles, Zap, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 space-y-8 animate-fade-in">
      <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          About NextGen Studio Tools
        </h2>
        
        <div className="space-y-6 text-foreground/80">
          <p className="leading-relaxed">
            NextGen Studio Tools is an AI-powered creative assistant designed specifically for content creators, YouTubers, and digital artists. 
            Using advanced Gemini AI technology, we help you generate professional scripts, engaging titles, SEO-optimized descriptions, and more.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1 text-foreground">AI-Powered</h3>
              <p className="text-sm text-foreground/70">Cutting-edge Gemini AI for creative content generation</p>
            </div>
            
            <div className="p-4 bg-accent/5 rounded-xl border border-accent/20">
              <Zap className="w-6 h-6 text-accent mb-2" />
              <h3 className="font-semibold mb-1 text-foreground">Lightning Fast</h3>
              <p className="text-sm text-foreground/70">Generate complete content ideas in seconds</p>
            </div>
            
            <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
              <Shield className="w-6 h-6 text-foreground mb-2" />
              <h3 className="font-semibold mb-1 text-foreground">Platform Ready</h3>
              <p className="text-sm text-foreground/70">Optimized for YouTube, TikTok, and Instagram</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-foreground/60">
              <strong className="text-foreground">Created by:</strong> Vanshu (Developer)<br />
              <strong className="text-foreground">Powered by:</strong> Nextgen AI with Gemini technology
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
