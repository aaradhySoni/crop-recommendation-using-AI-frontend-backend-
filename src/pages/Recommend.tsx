import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, ChevronLeft, Droplets, TestTube, Cloud, History } from "lucide-react";
import Navigation from "@/components/Navigation";
import AIChatbot from "@/components/AIChatbot";
import { useNavigate } from "react-router-dom";

const Recommend = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    soilPH: 7,
    moisture: 50,
    soilType: "",
    weather: "",
    pastCrop: "",
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Navigate to results
      navigate("/results", { state: { formData } });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return true;
      case 2: return formData.soilType !== "";
      case 3: return formData.weather !== "";
      case 4: return formData.pastCrop !== "";
      default: return false;
    }
  };

  return (
    <>
      <Navigation />
      <AIChatbot />
      
      <main className="min-h-screen pt-24 pb-12 bg-gradient-fresh">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Step {step} of {totalSteps}</span>
              <span className="text-sm font-medium text-primary">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-hero transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card with Enhanced Glow */}
          <Card className="glass-card-vibrant p-8 animate-fade-in hover-glow">
            {/* Step 1: Soil pH */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <TestTube className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-outfit text-2xl font-bold">Soil pH Level</h2>
                    <p className="text-muted-foreground">Adjust the slider to match your soil pH</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg">pH Level</Label>
                    <span className="text-3xl font-outfit font-bold text-primary-vibrant drop-shadow-lg glow-neon-green">{formData.soilPH.toFixed(1)}</span>
                  </div>
                  
                  <Slider
                    value={[formData.soilPH]}
                    onValueChange={([value]) => setFormData({ ...formData, soilPH: value })}
                    min={4}
                    max={10}
                    step={0.1}
                    className="py-4"
                  />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Acidic (4.0)</span>
                    <span>Neutral (7.0)</span>
                    <span>Alkaline (10.0)</span>
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground">
                      {formData.soilPH < 6 && "Your soil is acidic. Good for crops like rice and potatoes."}
                      {formData.soilPH >= 6 && formData.soilPH <= 8 && "Your soil is neutral. Ideal for most crops!"}
                      {formData.soilPH > 8 && "Your soil is alkaline. Good for crops like wheat and barley."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Soil Type */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-secondary/10 rounded-xl">
                    <Droplets className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="font-outfit text-2xl font-bold">Soil Type & Moisture</h2>
                    <p className="text-muted-foreground">Select your soil type and moisture level</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-lg mb-3 block">Soil Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Clay", "Sandy", "Loamy", "Silt"].map((type) => (
                        <Card
                          key={type}
                          className={`p-4 cursor-pointer transition-all hover-lift ${
                            formData.soilType === type
                              ? "border-primary-vibrant border-2 bg-primary/10 glow-neon-green"
                              : "hover:border-primary/50 glass-card"
                          }`}
                          onClick={() => setFormData({ ...formData, soilType: type })}
                        >
                          <div className="text-center font-semibold">{type}</div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg">Moisture Level</Label>
                      <span className="text-2xl font-outfit font-bold text-secondary-glow drop-shadow-lg glow-neon-blue">{formData.moisture}%</span>
                    </div>
                    
                    <Slider
                      value={[formData.moisture]}
                      onValueChange={([value]) => setFormData({ ...formData, moisture: value })}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Dry (0%)</span>
                      <span>Moderate (50%)</span>
                      <span>Wet (100%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Weather */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    <Cloud className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-outfit text-2xl font-bold">Weather Conditions</h2>
                    <p className="text-muted-foreground">Tell us about your local climate</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg">Typical Weather Pattern</Label>
                  <Select value={formData.weather} onValueChange={(value) => setFormData({ ...formData, weather: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select weather pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tropical">🌴 Tropical (Hot & Humid)</SelectItem>
                      <SelectItem value="arid">🌵 Arid (Hot & Dry)</SelectItem>
                      <SelectItem value="temperate">🌤️ Temperate (Mild)</SelectItem>
                      <SelectItem value="continental">❄️ Continental (Cold Winters)</SelectItem>
                      <SelectItem value="monsoon">🌧️ Monsoon (Heavy Rain Season)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Past Crop */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <History className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-outfit text-2xl font-bold">Previous Crop</h2>
                    <p className="text-muted-foreground">What did you grow last season?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg">Last Season's Crop</Label>
                  <Select value={formData.pastCrop} onValueChange={(value) => setFormData({ ...formData, pastCrop: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select previous crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">🌾 Wheat</SelectItem>
                      <SelectItem value="rice">🌾 Rice</SelectItem>
                      <SelectItem value="corn">🌽 Corn</SelectItem>
                      <SelectItem value="cotton">🧵 Cotton</SelectItem>
                      <SelectItem value="soybean">🫘 Soybean</SelectItem>
                      <SelectItem value="sugarcane">🎋 Sugarcane</SelectItem>
                      <SelectItem value="none">🆕 First Time Farming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="gap-2"
              >
                {step === totalSteps ? "Get Recommendation" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Recommend;
