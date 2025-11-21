import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import AIChatbot from "@/components/AIChatbot";
import { TrendingUp, DollarSign, Leaf, Award, ArrowLeft, Download } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import wheatIcon from "@/assets/wheat-icon.png";
import cornIcon from "@/assets/corn-icon.png";
import riceIcon from "@/assets/rice-icon.png";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  if (!formData) {
    navigate("/recommend");
    return null;
  }

  return (
    <>
      <Navigation />
      <AIChatbot />
      
      <main className="min-h-screen pt-24 pb-12 bg-gradient-fresh">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate("/recommend")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </Button>
          </div>

          <div className="text-center mb-8">
            <Badge className="bg-gradient-hero text-white mb-4">AI Analysis Complete</Badge>
            <h1 className="font-outfit text-4xl md:text-5xl font-bold mb-4">
              Your Crop Recommendations
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your soil, weather, and historical data
            </p>
          </div>

          {/* Top Recommendation */}
          <Card className="glass-card p-8 mb-6 animate-fade-in border-2 border-primary">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img src={wheatIcon} alt="Wheat" className="w-20 h-20" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-outfit text-3xl font-bold">Wheat</h2>
                    <Badge className="bg-gradient-hero text-white">Best Match</Badge>
                  </div>
                  <p className="text-muted-foreground">Highly recommended for your conditions</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-outfit font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Match Score</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Expected Yield</span>
                </div>
                <div className="text-2xl font-outfit font-bold text-primary">4.5 tons/acre</div>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Profit Potential</span>
                </div>
                <div className="text-2xl font-outfit font-bold text-accent">$2,400/acre</div>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">Sustainability</span>
                </div>
                <div className="text-2xl font-outfit font-bold text-secondary">Excellent</div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-xl">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Why Wheat?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Wheat is ideal for your soil pH of {formData.soilPH.toFixed(1)} and {formData.soilType.toLowerCase()} soil type. 
                    Your {formData.weather} weather conditions with {formData.moisture}% moisture are perfect for wheat cultivation. 
                    Historical data shows excellent performance in similar conditions, with strong market demand and good disease resistance.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Secondary Recommendations */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-card p-6 hover-scale animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-4 mb-4">
                <img src={cornIcon} alt="Corn" className="w-16 h-16" />
                <div>
                  <h3 className="font-outfit text-2xl font-bold">Corn</h3>
                  <div className="text-2xl font-outfit font-bold text-secondary">92%</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Yield</span>
                  <span className="font-semibold">3.8 tons/acre</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Potential</span>
                  <span className="font-semibold">$2,100/acre</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover-scale animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-4 mb-4">
                <img src={riceIcon} alt="Rice" className="w-16 h-16" />
                <div>
                  <h3 className="font-outfit text-2xl font-bold">Rice</h3>
                  <div className="text-2xl font-outfit font-bold text-secondary">87%</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Yield</span>
                  <span className="font-semibold">3.2 tons/acre</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Potential</span>
                  <span className="font-semibold">$1,900/acre</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Download Full Report
            </Button>
            <Button variant="glass" size="lg" onClick={() => navigate("/recommend")}>
              Try Another Analysis
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Results;
