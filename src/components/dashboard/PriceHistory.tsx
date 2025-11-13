import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, TrendingDown, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { usePriceVsPerformance } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const PriceHistory = () => {
  const { data, isLoading } = usePriceVsPerformance();
  const [showAlert, setShowAlert] = useState(false);

  const chartData = data?.slice(0, 100).map(item => ({
    name: item.cpuName.substring(0, 15),
    price: item.price,
    performance: item.cpuMark,
    category: item.category
  })) || [];

  const avgPrice = data?.reduce((sum, cpu) => sum + (cpu.price || 0), 0) / (data?.length || 1);
  const maxPrice = Math.max(...(data?.map(cpu => cpu.price || 0) || [0]));
  const minPrice = Math.min(...(data?.filter(cpu => cpu.price).map(cpu => cpu.price!) || [0]));

  const handleSetAlert = () => {
    toast.success("Price alert feature coming soon!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Price vs Performance Analysis</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSetAlert}
          className="hover:bg-primary/10 transition-colors"
        >
          <Bell className="w-4 h-4 mr-2" />
          Set Alert
        </Button>
      </div>

      <Card className="p-6 glass hover:shadow-xl transition-shadow">
        {isLoading ? (
          <Skeleton className="h-96 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--primary))" 
                fontSize={12}
                label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--accent))" 
                fontSize={12}
                label={{ value: 'Performance', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="performance" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--accent))' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 glass hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Average Price</div>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold text-gradient mb-1">
            ${avgPrice?.toFixed(0) || 'N/A'}
          </div>
          <div className="text-xs text-muted-foreground">Across all categories</div>
        </Card>
        
        <Card className="p-4 glass hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Highest Price</div>
            <TrendingUp className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-2xl font-bold text-gradient mb-1">
            ${maxPrice?.toFixed(0) || 'N/A'}
          </div>
          <div className="text-xs text-muted-foreground">Premium segment</div>
        </Card>

        <Card className="p-4 glass hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Budget Entry</div>
            <TrendingDown className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-gradient mb-1">
            ${minPrice?.toFixed(0) || 'N/A'}
          </div>
          <div className="text-xs text-muted-foreground">Entry-level</div>
        </Card>
      </div>
    </div>
  );
};
