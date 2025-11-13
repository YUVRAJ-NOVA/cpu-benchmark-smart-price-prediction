import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Loader2, TrendingUp, Zap } from "lucide-react";
import { usePerformancePredictor } from "@/hooks/usePredictions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const PerformancePlayground = () => {
  const [cores, setCores] = useState([8]);
  const [tdp, setTdp] = useState([95]);
  const [price, setPrice] = useState([400]);
  const [category, setCategory] = useState("Desktop");
  const [predictedMark, setPredictedMark] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<{ lower: number; upper: number } | null>(null);
  
  const { mutate: predictPerformance, isPending } = usePerformancePredictor();

  const runPrediction = () => {
    predictPerformance(
      {
        cores: cores[0],
        TDP: tdp[0],
        price: price[0],
        category,
      },
      {
        onSuccess: (data) => {
          setPredictedMark(data.predicted_value);
          setConfidence(data.confidence_interval || null);
          toast.success("Prediction complete!");
        },
        onError: (error) => {
          toast.error("Prediction failed: " + error.message);
        },
      }
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Zap className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Performance Playground</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="p-6 glass space-y-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Configure Specs</h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Cores</Label>
                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  {cores[0]}
                </span>
              </div>
              <Slider
                value={cores}
                onValueChange={setCores}
                max={64}
                min={2}
                step={2}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>TDP (Watts)</Label>
                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  {tdp[0]}W
                </span>
              </div>
              <Slider
                value={tdp}
                onValueChange={setTdp}
                max={280}
                min={15}
                step={5}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Price ($)</Label>
                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  ${price[0]}
                </span>
              </div>
              <Slider
                value={price}
                onValueChange={setPrice}
                max={2000}
                min={50}
                step={10}
                className="cursor-pointer"
              />
            </div>

            <div>
              <Label className="mb-2 block">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Server">Server</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={runPrediction} 
            disabled={isPending}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Predicting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Prediction
              </>
            )}
          </Button>
        </Card>

        {/* Results */}
        <Card className="p-6 glass hover:shadow-xl transition-shadow">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <span className="text-gradient">Predicted Performance</span>
          </h3>

          {predictedMark !== null ? (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-slow">
                <div className="text-sm text-muted-foreground mb-2">Estimated CPU Mark</div>
                <div className="text-5xl font-bold text-gradient mb-2 animate-fade-in">
                  {Math.round(predictedMark).toLocaleString()}
                </div>
                {confidence && (
                  <div className="text-sm text-muted-foreground">
                    Range: {Math.round(confidence.lower).toLocaleString()} - {Math.round(confidence.upper).toLocaleString()}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Performance per Watt</span>
                    <span className="font-bold text-primary">{(predictedMark / tdp[0]).toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                      style={{ width: `${Math.min((predictedMark / tdp[0] / 300) * 100, 100)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Performance per Dollar</span>
                    <span className="font-bold text-accent">{(predictedMark / price[0]).toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500" 
                      style={{ width: `${Math.min((predictedMark / price[0] / 150) * 100, 100)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Multi-core Score</span>
                    <span className="font-bold">{(cores[0] * (predictedMark / cores[0] * 0.85)).toFixed(0)}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3 text-sm">Configuration Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">Cores</div>
                    <div className="text-lg font-bold">{cores[0]}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">TDP</div>
                    <div className="text-lg font-bold">{tdp[0]}W</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">Price</div>
                    <div className="text-lg font-bold">${price[0]}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div className="text-lg font-bold">{category}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 text-muted-foreground">
              <div className="text-center">
                <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Configure specs and run prediction</p>
                <p className="text-sm">Adjust the sliders and click "Run Prediction"</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
