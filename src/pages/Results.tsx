import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import AIChatbot from "@/components/AIChatbot";
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Award,
  ArrowLeft,
  Download,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import wheatIcon from "@/assets/wheat-icon.png";
import cornIcon from "@/assets/corn-icon.png";
import riceIcon from "@/assets/rice-icon.png";

const ICONS: Record<string, string> = {
  wheat: wheatIcon,
  corn: cornIcon,
  rice: riceIcon,
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 This matches EXACTLY what Recommend.tsx sends
  const result = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate("/recommend");
    }
  }, [result, navigate]);

  if (!result) return null;

  const best = result.recommendations[0];
  const recs = result.recommendations;
  const formData = result.formData;

  const getIcon = (crop: string) => {
    const key = crop.toLowerCase();
    return ICONS[key] || wheatIcon;
  };

  return (
    <>
      <Navigation />
      <AIChatbot />

      <main className="min-h-screen pt-24 pb-12 bg-gradient-fresh">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/recommend")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </Button>
          </div>

          <div className="text-center mb-8">
            <Badge className="bg-gradient-vibrant text-white mb-4 animate-shimmer px-6 py-2 text-base">
              AI Analysis Complete
            </Badge>
            <h1 className="font-outfit text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              <span className="bg-gradient-neon bg-clip-text text-transparent drop-shadow-lg">
                Your Crop Recommendations
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Based on your soil, weather, and historical data
            </p>
          </div>

          {/* 🔥 BEST MATCH */}
          <Card className="glass-card-vibrant p-8 mb-6 animate-fade-in border-2 border-primary-vibrant glow-neon-green">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={getIcon(best.cropName)}
                  alt={best.cropName}
                  className="w-20 h-20"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-outfit text-3xl font-bold drop-shadow-md">
                      {best.cropName}
                    </h2>
                    <Badge className="bg-gradient-vibrant text-white animate-pulse-glow px-4 py-1">
                      Best Match
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Highly recommended for your farm
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-outfit font-bold text-primary-vibrant mb-1 drop-shadow-lg glow-neon-green">
                  {best.matchScore}%
                </div>
                <div className="text-sm text-muted-foreground font-semibold">
                  Match Score
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="glass-card-vibrant p-4 rounded-xl hover-lift glow-neon-green border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary-vibrant animate-bounce-subtle" />
                  <span className="font-semibold">Expected Yield</span>
                </div>
                <div className="text-2xl font-outfit font-bold text-primary-vibrant drop-shadow-lg">
                  {best.expectedYield}
                </div>
              </div>

              <div className="glass-card-vibrant p-4 rounded-xl hover-lift glow-neon-orange border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-accent-glow animate-bounce-subtle" />
                  <span className="font-semibold">Profit Potential</span>
                </div>
                <div className="text-2xl font-outfit font-bold text-accent-glow drop-shadow-lg">
                  {best.profitPotential}
                </div>
              </div>

              <div className="glass-card-vibrant p-4 rounded-xl hover-lift glow-neon-blue border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-secondary-glow animate-bounce-subtle" />
                  <span className="font-semibold">Sustainability</span>
                </div>
                <div className="text-2xl font-outfit font-bold text-secondary-glow drop-shadow-lg">
                  {best.sustainability}
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Why {best.cropName}?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {best.reasoning}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 🔥 SECONDARY CROPS */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {recs.slice(1).map((crop, index) => (
              <Card
                key={index}
                className="glass-card-vibrant p-6 hover-lift animate-fade-in border border-secondary/20 glow-neon-blue"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={getIcon(crop.cropName)}
                    alt={crop.cropName}
                    className="w-16 h-16 drop-shadow-lg"
                  />
                  <div>
                    <h3 className="font-outfit text-2xl font-bold drop-shadow-md">
                      {crop.cropName}
                    </h3>
                    <div className="text-2xl font-outfit font-bold text-secondary-glow drop-shadow-lg">
                      {crop.matchScore}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Yield</span>
                    <span className="font-bold text-foreground">
                      {crop.expectedYield}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Profit Potential
                    </span>
                    <span className="font-bold text-accent">
                      {crop.profitPotential}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="gap-2 animate-pulse-glow hover:scale-105 transition-transform"
            >
              <Download className="w-5 h-5" />
              Download Full Report
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate("/recommend")}
              className="hover-lift"
            >
              Try Another Analysis
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Results;
