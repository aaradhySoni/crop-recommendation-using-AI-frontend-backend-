import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-fresh">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 animate-float">
          <Leaf className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "0.5s" }}>
          <Sparkles className="w-12 h-12 text-accent" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: "1s" }}>
          <TrendingUp className="w-14 h-14 text-secondary" />
        </div>
        <div className="absolute top-60 right-40 animate-float" style={{ animationDelay: "1.5s" }}>
          <Leaf className="w-10 h-10 text-primary-glow" />
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Advanced AI</span>
            </div>
            
            <h1 className="font-outfit text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              AI Crop Recommendation for{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Smarter Farming
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Get personalized crop suggestions based on your soil conditions, weather patterns, and historical data. 
              Make data-driven decisions to maximize your yield and profit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate("/recommend")}
                className="group"
              >
                Start Recommendation
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              
              <Button 
                variant="glass" 
                size="xl"
                onClick={() => navigate("/recommend")}
              >
                Learn How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center lg:text-left">
                <div className="font-outfit text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-outfit text-3xl font-bold text-secondary">50k+</div>
                <div className="text-sm text-muted-foreground">Farmers Helped</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-outfit text-3xl font-bold text-accent">150+</div>
                <div className="text-sm text-muted-foreground">Crop Varieties</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="AI-powered smart farming landscape" 
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
