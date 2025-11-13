import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, TrendingUp, DollarSign } from "lucide-react";
import { usePricePredictor, usePerformancePredictor } from "@/hooks/usePredictions";
import { toast } from "sonner";

export const PredictorWidget = () => {
  const [open, setOpen] = useState(false);
  const [predictType, setPredictType] = useState<'price' | 'performance'>('price');
  const [formData, setFormData] = useState({
    cores: 8,
    TDP: 95,
    price: 500,
    cpuMark: 25000,
    threadMark: 3000,
    category: 'Desktop',
  });
  const [result, setResult] = useState<number | null>(null);

  const { mutate: predictPrice, isPending: isPredictingPrice } = usePricePredictor();
  const { mutate: predictPerformance, isPending: isPredictingPerformance } = usePerformancePredictor();

  const handlePredict = () => {
    if (predictType === 'price') {
      predictPrice(
        {
          cpuMark: formData.cpuMark,
          threadMark: formData.threadMark,
          cores: formData.cores,
          TDP: formData.TDP,
          category: formData.category,
        },
        {
          onSuccess: (data) => {
            setResult(data.predicted_value);
            toast.success(`Predicted price: $${data.predicted_value.toFixed(0)}`);
          },
          onError: () => toast.error('Prediction failed'),
        }
      );
    } else {
      predictPerformance(
        {
          cores: formData.cores,
          price: formData.price,
          TDP: formData.TDP,
          category: formData.category,
        },
        {
          onSuccess: (data) => {
            setResult(data.predicted_value);
            toast.success(`Predicted performance: ${Math.round(data.predicted_value).toLocaleString()} pts`);
          },
          onError: () => toast.error('Prediction failed'),
        }
      );
    }
  };

  const isPending = isPredictingPrice || isPredictingPerformance;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Predictor
        </Button>
      </DialogTrigger>
      <DialogContent className="glass max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Performance Predictor
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Prediction Type</Label>
            <Select value={predictType} onValueChange={(v) => setPredictType(v as 'price' | 'performance')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Predict Price
                  </div>
                </SelectItem>
                <SelectItem value="performance">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Predict Performance
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cores">Cores</Label>
              <Input 
                id="cores" 
                type="number" 
                value={formData.cores}
                onChange={(e) => setFormData({...formData, cores: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdp">TDP (W)</Label>
              <Input 
                id="tdp" 
                type="number" 
                value={formData.TDP}
                onChange={(e) => setFormData({...formData, TDP: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          {predictType === 'price' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpuMark">CPU Mark</Label>
                <Input 
                  id="cpuMark" 
                  type="number" 
                  value={formData.cpuMark}
                  onChange={(e) => setFormData({...formData, cpuMark: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="threadMark">Thread Mark</Label>
                <Input 
                  id="threadMark" 
                  type="number" 
                  value={formData.threadMark}
                  onChange={(e) => setFormData({...formData, threadMark: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desktop">Desktop</SelectItem>
                <SelectItem value="Server">Server</SelectItem>
                <SelectItem value="Laptop">Laptop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {result !== null && (
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 animate-fade-in">
              <div className="text-sm text-muted-foreground mb-1">
                {predictType === 'price' ? 'Predicted Price' : 'Predicted Performance'}
              </div>
              <div className="text-3xl font-bold text-gradient">
                {predictType === 'price' ? `$${result.toFixed(0)}` : result.toLocaleString() + ' pts'}
              </div>
            </div>
          )}

          <Button 
            onClick={handlePredict}
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
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Prediction
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
