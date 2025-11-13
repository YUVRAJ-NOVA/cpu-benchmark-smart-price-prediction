import { useState, useEffect } from 'react';
import { Github, Linkedin, Globe, Sparkles, Code, Brain, Cpu, Zap, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Credits = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('credits-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setParticleCount((prev) => (prev + 1) % 20);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const skills = [
    { icon: Brain, text: 'AI/ML Expert', color: 'from-purple-500 to-pink-500' },
    { icon: Code, text: 'Data Science', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, text: 'AI Automation', color: 'from-yellow-500 to-orange-500' },
    { icon: Sparkles, text: 'Gen AI', color: 'from-green-500 to-emerald-500' },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/YUVRAJ-NOVA',
      color: 'hover:bg-purple-500/20 hover:text-purple-400',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/yuvraj-singh-kushwah-2b88b8366/',
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      label: 'Portfolio',
      url: '#',
      color: 'hover:bg-green-500/20 hover:text-green-400',
      gradient: 'from-green-500 to-emerald-500',
      disabled: false
    },
  ];

  return (
    <section
      id="credits-section"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-card to-background"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"
          style={{
            left: `${(mousePosition.x / 10)}px`,
            top: `${(mousePosition.y / 10)}px`,
            transition: 'all 0.3s ease-out',
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-slow"
          style={{
            right: `${(mousePosition.x / 10)}px`,
            bottom: `${(mousePosition.y / 10)}px`,
            animationDelay: '1s',
            transition: 'all 0.3s ease-out',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header with Animation */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-primary/30 animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-sm font-semibold text-primary">Crafted with Passion</span>
            <Sparkles className="w-5 h-5 text-accent animate-spin-slow" style={{ animationDelay: '1s' }} />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold">
            <span className="inline-block animate-text-blur-in">Meet the </span>
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-blur-in bg-300% animate-gradient" style={{ animationDelay: '0.2s' }}>
              Creator
            </span>
          </h2>
        </div>

        {/* Main Credits Card */}
        <div className={`glass rounded-3xl overflow-hidden border border-primary/20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Photo & Info */}
            <div className="relative p-12 flex flex-col items-center justify-center space-y-8 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
              {/* Animated Photo Frame */}
              <div className="relative group">
                {/* Rotating Border */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-75 blur-xl group-hover:opacity-100 transition-opacity animate-spin-slow" />
                
                {/* Photo Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-slow" />
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/yuv.jpg"
                      alt="Yuvraj Singh Kushwah"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Orbiting Icons */}
                {skills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={i}
                      className="absolute w-12 h-12 rounded-full glass border border-primary/30 flex items-center justify-center animate-orbit"
                      style={{
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '8s',
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 90}deg) translateX(140px) rotate(-${i * 90}deg)`,
                      }}
                    >
                      <Icon className={`w-5 h-5 text-primary`} />
                    </div>
                  );
                })}
              </div>

              {/* Name & Title */}
              <div className="text-center space-y-3 relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-300%">
                  Yuvraj Singh Kushwah
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <p className="text-lg font-semibold text-primary">Aspiring Data Scientist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Skills & Social */}
            <div className="p-12 flex flex-col justify-between space-y-8">
              {/* Skills Grid */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Expertise
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={i}
                        className="group relative glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {/* Hover gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        
                        <div className="relative space-y-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} p-2.5 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                          <p className="font-semibold text-sm">{skill.text}</p>
                        </div>

                        {/* Animated particles on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {[...Array(5)].map((_, j) => (
                            <div
                              key={j}
                              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${skill.color} animate-float`}
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${j * 0.2}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-6 h-6 text-accent" />
                  Connect With Me
                </h4>
                
                <div className="space-y-3">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.url}
                        target={social.disabled ? undefined : "_blank"}
                        rel={social.disabled ? undefined : "noopener noreferrer"}
                        className={`group relative block ${social.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={(e) => social.disabled && e.preventDefault()}
                      >
                        <div className={`glass p-5 rounded-xl border border-primary/20 transition-all duration-300 ${
                          !social.disabled && 'hover:border-primary/50 hover:scale-[1.02] hover:shadow-lg'
                        }`}>
                          {/* Animated background gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 ${!social.disabled && 'group-hover:opacity-10'} transition-opacity duration-300 rounded-xl`} />
                          
                          <div className="relative flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${social.gradient} p-2.5 flex items-center justify-center ${!social.disabled && 'group-hover:scale-110 group-hover:rotate-6'} transition-all duration-300`}>
                              <Icon className="w-full h-full text-white" />
                            </div>
                            
                            <div className="flex-1">
                              <p className="font-bold text-lg">{social.label}</p>
                              {social.disabled && (
                                <p className="text-xs text-muted-foreground">Coming Soon</p>
                              )}
                            </div>
                            
                            {!social.disabled && (
                              <ChevronUp className="w-5 h-5 text-muted-foreground rotate-90 group-hover:translate-x-1 transition-transform" />
                            )}
                          </div>
                        </div>

                        {/* Ripple effect on hover */}
                        {!social.disabled && (
                          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                            <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity`} />
                          </div>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <div className="glass p-6 rounded-2xl border border-primary/30 text-center space-y-3 bg-gradient-to-br from-primary/5 to-accent/5">
                <p className="text-sm text-muted-foreground">
                  Passionate about building intelligent systems that solve real-world problems
                </p>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Code className="w-4 h-4 animate-pulse" />
                  <span className="text-xs font-mono">Building the Future with AI</span>
                  <Brain className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credit Line with Animation */}
        <div className="mt-12 text-center space-y-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-slow" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Designed & Developed with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span>by Yuvraj Singh Kushwah</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-primary">© 2025</span>
              <span>All Rights Reserved</span>
            </div>
          </div>

          {/* Tech Stack Icons */}
          <div className="flex items-center justify-center gap-6 pt-4">
            {['React', 'TypeScript', 'TailwindCSS', 'Vite'].map((tech, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-full glass border border-primary/20 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        className="absolute bottom-8 right-8 w-12 h-12 rounded-full glass border border-primary/30 hover:border-primary hover:scale-110 transition-all duration-300 group shadow-xl"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </Button>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .bg-300\\% {
          background-size: 300%;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Credits;
