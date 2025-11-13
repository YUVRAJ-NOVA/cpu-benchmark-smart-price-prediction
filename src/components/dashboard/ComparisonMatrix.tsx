import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Download, Plus, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCompareCPUs, useCPUs, CPU } from "@/hooks/useCPUData";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ComparisonMatrixProps {
  selectedCPUs: string[];
  onUpdateSelection: (cpus: string[]) => void;
}

export const ComparisonMatrix = ({ selectedCPUs, onUpdateSelection }: ComparisonMatrixProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allCPUs, isLoading: isLoadingAll } = useCPUs(50);
  const { mutate: compareCPUs, data: comparedCPUs, isPending: isComparing } = useCompareCPUs();

  useEffect(() => {
    if (selectedCPUs.length > 0) {
      compareCPUs(selectedCPUs, {
        onError: (error: any) => {
          console.error('Error comparing CPUs:', error);
          toast.error(error?.response?.data?.detail || 'Failed to compare CPUs');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCPUs]);

  const filteredCPUs = allCPUs?.filter(cpu => 
    cpu.cpuName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 20) || [];

  const addCPU = (cpuName: string) => {
    if (selectedCPUs.length < 6 && !selectedCPUs.includes(cpuName)) {
      onUpdateSelection([...selectedCPUs, cpuName]);
      setDialogOpen(false);
      setSearchQuery("");
      toast.success(`Added ${cpuName} to comparison`);
    } else if (selectedCPUs.length >= 6) {
      toast.error("Maximum 6 CPUs can be compared");
    }
  };

  const removeCPU = (cpu: string) => {
    onUpdateSelection(selectedCPUs.filter(c => c !== cpu));
    toast.info(`Removed ${cpu} from comparison`);
  };

  const exportToPNG = async () => {
    toast.info("Export feature coming soon!");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">CPU Comparison</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={exportToPNG}
          className="hover:bg-primary/10 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PNG
        </Button>
      </div>

      {isComparing && selectedCPUs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(selectedCPUs.length)].map((_, i) => (
            <Card key={i} className="p-6 glass animate-pulse">
              <Skeleton className="h-64 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparedCPUs?.map((cpu, i) => (
            <Card key={i} className="p-6 glass relative group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-fade-in">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeCPU(cpu.cpuName)}
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-float">
                  <span className="text-2xl font-bold text-gradient">{cpu.cores}</span>
                </div>
                <h3 className="font-bold text-lg mb-1 truncate" title={cpu.cpuName}>{cpu.cpuName}</h3>
                <p className="text-sm text-muted-foreground">{cpu.cores} cores • {cpu.TDP}W • {cpu.category}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">CPU Mark</span>
                    <span className="font-bold text-primary">{cpu.cpuMark.toLocaleString()}</span>
                  </div>
                  <Progress value={(cpu.cpuMark / 60000) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Single Thread</span>
                    <span className="font-bold">{cpu.threadMark.toLocaleString()}</span>
                  </div>
                  <Progress value={(cpu.threadMark / 5000) * 100} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-2xl font-bold text-gradient">
                      {cpu.price ? `$${cpu.price}` : 'N/A'}
                    </span>
                  </div>
                  {cpu.price && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">Value</span>
                      <span className="text-sm font-semibold">
                        {(cpu.cpuMark / cpu.price).toFixed(1)} pts/$
                      </span>
                    </div>
                  )}
                  {cpu.powerPerf && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">Efficiency</span>
                      <span className="text-sm font-semibold">{cpu.powerPerf.toFixed(1)} pts/W</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {selectedCPUs.length < 6 && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Card className="p-6 glass flex items-center justify-center min-h-[400px] cursor-pointer hover:scale-[1.02] hover:border-primary transition-all border-dashed group">
                  <div className="text-center">
                    <Plus className="w-12 h-12 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">Add CPU to compare</p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="glass max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Select CPU to Compare</DialogTitle>
                  <DialogDescription>
                    Search and select a CPU to add to your comparison. You can compare up to 6 CPUs at once.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Search CPUs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {isLoadingAll ? (
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                      </div>
                    ) : filteredCPUs.length > 0 ? (
                      filteredCPUs.map((cpu) => (
                        <Card
                          key={cpu.cpuName}
                          className="p-4 hover:bg-secondary cursor-pointer transition-colors"
                          onClick={() => addCPU(cpu.cpuName)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">{cpu.cpuName}</h4>
                              <p className="text-xs text-muted-foreground">
                                {cpu.cores} cores • {cpu.TDP}W • {cpu.cpuMark.toLocaleString()} pts
                              </p>
                            </div>
                            <Plus className="w-5 h-5 text-primary" />
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No CPUs found
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
};
