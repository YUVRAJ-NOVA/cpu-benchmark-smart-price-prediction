import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FilterPanel, FilterState } from "@/components/dashboard/FilterPanel";
import { ComparisonMatrix } from "@/components/dashboard/ComparisonMatrix";
import { PerformancePlayground } from "@/components/dashboard/PerformancePlayground";
import { PriceHistory } from "@/components/dashboard/PriceHistory";
import { PredictorWidget } from "@/components/dashboard/PredictorWidget";
import { CPUTable } from "@/components/dashboard/CPUTable";
import { Menu, X, Download } from "lucide-react";
import { useCPUs } from "@/hooks/useCPUData";
import { exportToCSV, exportToJSON } from "@/lib/exportUtils";
import { toast } from "sonner";

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCPUs, setSelectedCPUs] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const { data: allCPUs } = useCPUs();

  const handleExportCSV = () => {
    if (allCPUs && allCPUs.length > 0) {
      exportToCSV(allCPUs, `cpu-benchmark-data-${new Date().toISOString().split('T')[0]}`);
      toast.success(`Exported ${allCPUs.length} CPUs to CSV`);
    } else {
      toast.error('No data available to export');
    }
  };

  const handleExportJSON = () => {
    if (allCPUs && allCPUs.length > 0) {
      exportToJSON(allCPUs, `cpu-benchmark-data-${new Date().toISOString().split('T')[0]}`);
      toast.success(`Exported ${allCPUs.length} CPUs to JSON`);
    } else {
      toast.error('No data available to export');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden hover:scale-110 transition-transform"
            >
              {showFilters ? <X /> : <Menu />}
            </Button>
            <h1 className="text-2xl font-bold">
              <span className="text-gradient animate-pulse-slow">CPU Benchmark</span> Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportCSV}
              className="hover:bg-primary/10 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportJSON}
              className="hover:bg-accent/10 transition-colors hidden sm:flex"
            >
              <Download className="w-4 h-4 mr-2" />
              JSON
            </Button>
            <PredictorWidget />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Filter Panel */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block transition-all`}>
            <FilterPanel onFilterChange={setFilters} />
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            <Tabs defaultValue="compare" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="playground">Playground</TabsTrigger>
                <TabsTrigger value="prices">Prices</TabsTrigger>
                <TabsTrigger value="table">All CPUs</TabsTrigger>
              </TabsList>

              <TabsContent value="compare" className="mt-6">
                <ComparisonMatrix 
                  selectedCPUs={selectedCPUs}
                  onUpdateSelection={setSelectedCPUs}
                />
              </TabsContent>

              <TabsContent value="playground" className="mt-6">
                <PerformancePlayground />
              </TabsContent>

              <TabsContent value="prices" className="mt-6">
                <PriceHistory />
              </TabsContent>

              <TabsContent value="table" className="mt-6">
                <CPUTable 
                  onSelectCPU={(cpu) => {
                    if (!selectedCPUs.includes(cpu) && selectedCPUs.length < 6) {
                      setSelectedCPUs([...selectedCPUs, cpu]);
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
