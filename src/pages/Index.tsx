import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cpu, Zap, TrendingUp, Database, Search, ArrowRight, X, Clock, DollarSign, Activity, ThermometerSun, Gauge, Award, Target, BarChart3, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Credits from "@/components/Credits";

const Index = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [selectedCPU, setSelectedCPU] = useState<any>(null);

  const phrases = [
    "Perfect CPU",
    "Best Performance",
    "Ultimate Value",
    "Gaming Beast",
    "Workstation Power"
  ];

  const demoSteps = [
    { title: "Compare CPUs", description: "Side-by-side analysis of up to 6 processors", icon: Cpu },
    { title: "AI Predictions", description: "Estimate performance before you buy", icon: Zap },
    { title: "Price Tracking", description: "Monitor price history and get alerts", icon: TrendingUp },
    { title: "Deep Analysis", description: "Interactive notebook with 3,825 CPUs", icon: Database }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showDemo) {
      const interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showDemo]);

  useEffect(() => {
    const searchCPUs = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      
      // Simulate API delay
      setTimeout(() => {
        const mockResults = [
          { 
            name: "Intel Core i9-13900K", 
            cores: 24, 
            threads: 32,
            baseFreq: 3.0,
            boostFreq: 5.8,
            price: 589, 
            cpuMark: 54433, 
            category: "Desktop", 
            socket: "LGA1700",
            tdp: 125,
            year: 2022,
            manufacturer: "Intel"
          },
          { 
            name: "AMD Ryzen 9 7950X", 
            cores: 16, 
            threads: 32,
            baseFreq: 4.5,
            boostFreq: 5.7,
            price: 699, 
            cpuMark: 51363, 
            category: "Desktop", 
            socket: "AM5",
            tdp: 170,
            year: 2022,
            manufacturer: "AMD"
          },
          { 
            name: "Intel Core i7-13700K", 
            cores: 16, 
            threads: 24,
            baseFreq: 3.4,
            boostFreq: 5.4,
            price: 419, 
            cpuMark: 46399, 
            category: "Desktop", 
            socket: "LGA1700",
            tdp: 125,
            year: 2022,
            manufacturer: "Intel"
          },
          { 
            name: "AMD Ryzen 7 7700X", 
            cores: 8, 
            threads: 16,
            baseFreq: 4.5,
            boostFreq: 5.4,
            price: 399, 
            cpuMark: 37614, 
            category: "Desktop", 
            socket: "AM5",
            tdp: 105,
            year: 2022,
            manufacturer: "AMD"
          }
        ].filter(cpu => 
          cpu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cpu.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cpu.cores.toString().includes(searchQuery)
        );
        
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 300);
    };

    searchCPUs();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                Ultimate CPU Benchmark Platform
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Find Your
              <span className="block relative min-h-[1.2em] mt-2">
                <span 
                  key={currentPhrase}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-text-blur-in"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {phrases[currentPhrase]}
                </span>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Compare 3,800+ processors. Predict performance. Analyze real-world benchmarks with AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-secondary"
                onClick={() => setShowDemo(true)}
              >
                Interactive Demo
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gradient">3,825</div>
                <div className="text-sm text-muted-foreground">CPUs Tested</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gradient">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gradient">Real-time</div>
                <div className="text-sm text-muted-foreground">Predictions</div>
              </div>
            </div>
          </div>

          {/* Right: 3D CPU Visual */}
          <div className="relative animate-float">
            <div className="relative w-full aspect-square">
              {/* CPU Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl rotate-45 animate-pulse-slow"></div>
                  <div className="absolute inset-4 bg-card rounded-2xl rotate-45 flex items-center justify-center">
                    <Cpu className="w-32 h-32 text-primary -rotate-45" strokeWidth={1.5} />
                  </div>
                  {/* Corner Pins */}
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-primary rounded-full"
                      style={{
                        top: i < 2 ? '-6px' : 'auto',
                        bottom: i >= 2 ? '-6px' : 'auto',
                        left: i % 2 === 0 ? '-6px' : 'auto',
                        right: i % 2 === 1 ? '-6px' : 'auto',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Quick CPU Search</h2>
            </div>
            <div className="relative">
              <Input
                placeholder="Search by model, brand, or specs... (e.g., Intel i7, AMD Ryzen 5, 8 cores)"
                className="h-14 pl-12 text-lg bg-background/50 border-border transition-all duration-300 focus:shadow-glow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 grid gap-4 animate-fade-in">
                {searchResults.map((cpu, idx) => (
                  <Card 
                    key={idx}
                    className="p-6 glass hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => setSelectedCPU(cpu)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Cpu className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all">
                              {cpu.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{cpu.socket} • {cpu.category}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Activity className="w-3 h-3" /> CPU Mark
                            </p>
                            <p className="text-2xl font-bold text-gradient">{cpu.cpuMark.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Cpu className="w-3 h-3" /> Cores
                            </p>
                            <p className="text-2xl font-bold text-primary">{cpu.cores}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <DollarSign className="w-3 h-3" /> Price
                            </p>
                            <p className="text-2xl font-bold text-accent">${cpu.price}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Value</p>
                            <p className="text-lg font-bold text-foreground">
                              {(cpu.cpuMark / cpu.price).toFixed(0)} pts/$
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Badge variant="secondary" className="animate-pulse-slow">
                            {cpu.category}
                          </Badge>
                          <Badge variant="outline">
                            {cpu.cores} cores
                          </Badge>
                        </div>
                      </div>

                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {isSearching && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Searching...
                </div>
              </div>
            )}
            
            {searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="mt-6 text-center text-muted-foreground">
                No CPUs found matching "{searchQuery}"
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Intel i9', 'AMD Ryzen 9', 'Budget CPUs', 'Gaming', 'Workstation'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground">Everything you need to make the right CPU choice</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cpu,
                title: 'Compare CPUs',
                description: 'Side-by-side comparison of up to 6 processors with detailed metrics',
                color: 'text-primary',
              },
              {
                icon: Zap,
                title: 'Performance Prediction',
                description: 'AI-powered performance estimation based on specs and real benchmarks',
                color: 'text-accent',
              },
              {
                icon: TrendingUp,
                title: 'Price History',
                description: 'Track historical pricing and get alerts for price drops',
                color: 'text-primary',
              },
              {
                icon: Database,
                title: 'Notebook Explorer',
                description: 'Interactive data analysis with live Jupyter notebook integration',
                color: 'text-accent',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass p-12 rounded-3xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect CPU?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users making informed processor decisions
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CPU Detail Modal */}
      <Dialog open={!!selectedCPU} onOpenChange={() => setSelectedCPU(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto glass">
          {selectedCPU && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-3xl font-bold text-gradient mb-1">
                        {selectedCPU.name}
                      </DialogTitle>
                      <DialogDescription className="flex items-center gap-2 text-base">
                        <Badge variant="secondary">{selectedCPU.manufacturer}</Badge>
                        <Badge variant="outline">{selectedCPU.year}</Badge>
                        <Badge variant="outline">{selectedCPU.socket}</Badge>
                      </DialogDescription>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Performance Score */}
                <div className="glass p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Performance Score
                    </h3>
                    <span className="text-4xl font-bold text-gradient">
                      {selectedCPU.cpuMark.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(selectedCPU.cpuMark / 60000) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Benchmark score relative to top-tier CPUs
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Price</span>
                    </div>
                    <p className="text-3xl font-bold text-accent">${selectedCPU.price}</p>
                    <p className="text-xs text-muted-foreground">MSRP</p>
                  </div>
                  
                  <div className="glass p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Value Score</span>
                    </div>
                    <p className="text-3xl font-bold text-primary">
                      {(selectedCPU.cpuMark / selectedCPU.price).toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Points per dollar</p>
                  </div>

                  <div className="glass p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ThermometerSun className="w-4 h-4" />
                      <span className="text-sm">Power (TDP)</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{selectedCPU.tdp}W</p>
                    <p className="text-xs text-muted-foreground">Thermal Design Power</p>
                  </div>

                  <div className="glass p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Efficiency</span>
                    </div>
                    <p className="text-3xl font-bold text-primary">
                      {(selectedCPU.cpuMark / selectedCPU.tdp).toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Points per watt</p>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Technical Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Cores / Threads</span>
                        <span className="font-bold">{selectedCPU.cores} / {selectedCPU.threads}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Base Frequency</span>
                        <span className="font-bold">{selectedCPU.baseFreq} GHz</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Boost Frequency</span>
                        <span className="font-bold text-primary">{selectedCPU.boostFreq} GHz</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Socket Type</span>
                        <span className="font-bold">{selectedCPU.socket}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-bold">{selectedCPU.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Release Year</span>
                        <span className="font-bold">{selectedCPU.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Analysis */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Best For
                    </h3>
                    <div className="space-y-3">
                      {selectedCPU.cpuMark > 45000 && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span>High-end Gaming & Streaming</span>
                        </div>
                      )}
                      {selectedCPU.cores >= 12 && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span>Content Creation & Rendering</span>
                        </div>
                      )}
                      {selectedCPU.cpuMark / selectedCPU.price > 70 && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span>Best Value for Money</span>
                        </div>
                      )}
                      {selectedCPU.tdp < 100 && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span>Power Efficient Builds</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span>Professional Workstation</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-primary" />
                      Performance Ratings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Single-Core</span>
                          <span className="font-bold">{Math.min(95, Math.round((selectedCPU.boostFreq / 6) * 100))}%</span>
                        </div>
                        <Progress value={Math.min(95, Math.round((selectedCPU.boostFreq / 6) * 100))} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Multi-Core</span>
                          <span className="font-bold">{Math.min(95, Math.round((selectedCPU.cores / 32) * 100))}%</span>
                        </div>
                        <Progress value={Math.min(95, Math.round((selectedCPU.cores / 32) * 100))} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Power Efficiency</span>
                          <span className="font-bold">{Math.min(95, 100 - Math.round((selectedCPU.tdp / 200) * 100))}%</span>
                        </div>
                        <Progress value={Math.min(95, 100 - Math.round((selectedCPU.tdp / 200) * 100))} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link to="/dashboard" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                      <BarChart3 className="mr-2 w-5 h-5" />
                      Compare with Others
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="flex-1">
                    <TrendingUp className="mr-2 w-5 h-5" />
                    Track Price
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Interactive Demo Modal */}
      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-3xl glass">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient">Interactive Feature Tour</DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 py-6">
            <div className="space-y-6">
              {demoSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                      idx === demoStep 
                        ? 'border-primary bg-primary/10 scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setDemoStep(idx)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        idx === demoStep ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative h-[400px] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  key={demoStep}
                  className="text-center p-8 animate-fade-in"
                >
                  {demoStep === 0 && (
                    <div className="space-y-6">
                      <Cpu className="w-24 h-24 mx-auto text-primary animate-float" />
                      <p className="text-lg">Compare up to <span className="text-3xl font-bold text-gradient">6 CPUs</span> side-by-side</p>
                      <div className="flex gap-2 justify-center">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-12 h-16 bg-card rounded-lg animate-pulse-slow" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {demoStep === 1 && (
                    <div className="space-y-6">
                      <Zap className="w-24 h-24 mx-auto text-accent animate-pulse-slow glow" />
                      <p className="text-lg">AI-powered predictions with <span className="text-3xl font-bold text-gradient">95%</span> accuracy</p>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse-slow" style={{ width: '95%' }} />
                      </div>
                    </div>
                  )}
                  {demoStep === 2 && (
                    <div className="space-y-6">
                      <TrendingUp className="w-24 h-24 mx-auto text-primary animate-float" />
                      <p className="text-lg">Track <span className="text-3xl font-bold text-gradient">price history</span> and get alerts</p>
                      <div className="flex gap-1 items-end justify-center h-20">
                        {[60, 80, 70, 90, 75, 85, 65].map((height, i) => (
                          <div 
                            key={i} 
                            className="w-8 bg-gradient-to-t from-primary to-accent rounded-t animate-fade-in"
                            style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {demoStep === 3 && (
                    <div className="space-y-6">
                      <Database className="w-24 h-24 mx-auto text-accent animate-pulse-slow" />
                      <p className="text-lg">Analyze <span className="text-3xl font-bold text-gradient">3,825</span> processors</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="h-12 bg-card rounded animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div className="flex gap-2">
              {demoSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === demoStep ? 'w-8 bg-primary' : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
            <Link to="/dashboard">
              <Button onClick={() => setShowDemo(false)}>
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credits Section */}
      <Credits />
    </div>
  );
};

export default Index;
