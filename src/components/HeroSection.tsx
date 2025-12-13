import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToIndex = () => {
    const element = document.querySelector('#index');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20 md:px-12">
      {/* Content */}
      <div className="content-container text-center z-10 flex flex-col items-center">
        {/* Main Title with Cinematic Light Border */}
        <div className="relative mb-6 md:mb-8 fade-in-up stagger-2">
          {/* Animated Light Border */}
          <div className="absolute -inset-4 md:-inset-6 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 animate-border-light">
              <div className="absolute inset-0 bg-gradient-conic from-transparent via-accent/40 to-transparent" 
                   style={{
                     background: 'conic-gradient(from var(--border-angle, 0deg), transparent 0%, transparent 25%, hsl(var(--accent) / 0.4) 50%, transparent 75%, transparent 100%)'
                   }}
              />
            </div>
            {/* Inner mask to create border effect */}
            <div className="absolute inset-[1px] bg-background rounded-2xl" />
          </div>
          
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight relative z-10 px-4 py-2">
            <span className="text-gradient my-[15px] text-7xl">
              Your branding, your future,
              <br />
              is Here
            </span>
          </h1>
        </div>
        
        {/* Agency Credit */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground fade-in-up stagger-4">
          <span className="w-8 h-px bg-border" />
          <span className="tracking-widest uppercase text-xs">POR MAXSELL ADVIDOR</span>
          <span className="w-8 h-px bg-border" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={scrollToIndex} className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 fade-in-up stagger-5">
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown className="w-5 h-5 scroll-indicator" />
      </button>
    </section>
  );
};

export default HeroSection;