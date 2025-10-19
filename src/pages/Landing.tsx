import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, Target, TrendingUp, Video, FileText, Hash } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "AI Video Scripts",
      description: "Generate professional scripts for any platform in seconds"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Get titles, descriptions, and tags optimized for search"
    },
    {
      icon: <Hash className="w-6 h-6" />,
      title: "Smart Hashtags",
      description: "Trending hashtags tailored to your content"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Multi-Platform",
      description: "Optimize for YouTube, Instagram, TikTok, and more"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "AI-powered generation in under 10 seconds"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Creator Focused",
      description: "Built by creators, for creators"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col animated-bg">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">NextGen Studio</h1>
          </div>
          <Button 
            onClick={() => navigate("/app")} 
            variant="outline"
            className="text-sm md:text-base"
          >
            Launch App
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-6 md:mb-8">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-xs md:text-sm font-medium">AI-Powered Content Generation</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-foreground leading-tight">
            Create Professional Content <br className="hidden sm:block" />
            in <span className="text-primary">Seconds</span>
          </h2>
          
          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Generate video scripts, SEO-optimized titles, descriptions, tags, and hashtags 
            for YouTube, Instagram, TikTok, and more—all with advanced AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/app")}
              className="w-full sm:w-auto text-base md:text-lg px-8 py-6 rounded-xl"
            >
              Get Started Free
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto text-base md:text-lg px-8 py-6 rounded-xl"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-16 md:mb-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-3xl mx-auto p-8 md:p-12 rounded-3xl border border-border bg-card/30 backdrop-blur-sm">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Transform Your Content?
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mb-8 px-4">
            Join thousands of creators using AI to scale their content production.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/app")}
            className="text-base md:text-lg px-8 md:px-12 py-6 rounded-xl"
          >
            Start Creating Now
          </Button>
        </div>
      </main>

      <footer className="py-6 md:py-8 px-4 border-t border-border bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2025 Nextup Studio — Created by Vanshu
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;