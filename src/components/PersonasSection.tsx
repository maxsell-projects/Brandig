import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const PersonasSection = () => {
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { personas } = useBrandStore();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      const slideProgress = progress * personas.items.length;
      const newIndex = Math.min(Math.floor(slideProgress), personas.items.length - 1);
      setActiveIndex(Math.max(0, newIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [personas.items.length]);

  return (
    <section 
      id="personas" 
      ref={(el) => {
        if (el) {
          (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      className="relative"
      style={{ height: `${(personas.items.length + 1) * 60}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex overflow-hidden bg-background">
        
        <div className="flex-1 relative flex items-center justify-center">
          <div className={`absolute top-8 left-8 md:left-16 z-10 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">{personas.sectionNumber}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">{personas.title}</h2>
          </div>

          {personas.items.map((persona, index) => {
            const isActive = index === activeIndex;
            const isPrev = index < activeIndex;
            
            return (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  isActive ? 'opacity-100 scale-100 blur-0' : isPrev ? 'opacity-0 scale-90 -translate-y-12 blur-sm' : 'opacity-0 scale-95 translate-y-12 blur-sm'
                }`}
              >
                <div className="w-full max-w-4xl px-6">
                  <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 items-center">
                    
                    <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 flex items-center justify-center bg-muted/20 rounded-full border border-accent/20 overflow-hidden">
                      {persona.image ? (
                        <img src={persona.image} alt={persona.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-heading text-5xl md:text-7xl font-bold text-accent">{persona.number}</span>
                      )}
                    </div>

                    <div className="text-center md:text-left space-y-4">
                      <h3 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">{persona.title}</h3>
                      <div className="h-1 w-20 bg-accent mx-auto md:mx-0" />
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                        {persona.description}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex flex-col items-end justify-center pr-8 lg:pr-16 w-48">
          <div className="space-y-2">
            {personas.items.map((_, index) => (
              <div key={index} className={`transition-all duration-300 flex items-center gap-2 justify-end ${index === activeIndex ? 'opacity-100' : 'opacity-30'}`}>
                <span className="text-xs font-mono">{String(index + 1).padStart(2, '0')}</span>
                <div className={`h-[2px] bg-accent transition-all duration-300 ${index === activeIndex ? 'w-8' : 'w-2'}`} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PersonasSection;