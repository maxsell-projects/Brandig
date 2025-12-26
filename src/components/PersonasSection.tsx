import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const PersonasSection = () => {
  const { ref: inViewRef, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { brandStrategy } = useBrandStore();

  if (!brandStrategy || !brandStrategy.cards) return null;

  const cards = brandStrategy.cards;

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
      
      // Ajuste fino para garantir que o último slide apareça totalmente
      const slideProgress = progress * (cards.length - 0.5); 
      const newIndex = Math.min(Math.floor(slideProgress), cards.length - 1);
      setActiveIndex(Math.max(0, newIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  return (
    <section 
      id="strategy" 
      ref={(el) => {
        if (el) {
          (inViewRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      className="relative bg-background"
      style={{ height: `${(cards.length + 0.5) * 100}vh` }} // Altura dinâmica baseada no número de cards
    >
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        
        {/* Título da Seção (Fixo) */}
        <div className={`absolute top-8 left-8 md:top-24 md:left-16 z-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">{brandStrategy.sectionNumber}</p>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">{brandStrategy.title}</h2>
        </div>

        <div className="flex-1 relative w-full h-full flex items-center justify-center p-4 md:p-12">
            
            {cards.map((card, index) => {
               // Lógica de visibilidade do slide
               const isActive = index === activeIndex;
               const isPrev = index < activeIndex;
               
               let styleClass = '';
               if (isActive) styleClass = 'opacity-100 scale-100 blur-0 z-10';
               else if (isPrev) styleClass = 'opacity-0 scale-95 -translate-y-12 blur-sm pointer-events-none z-0';
               else styleClass = 'opacity-0 scale-105 translate-y-12 blur-sm pointer-events-none z-0';

               return (
                 <div key={card.id} className={`absolute inset-0 flex items-center justify-center p-4 md:p-16 transition-all duration-700 ease-out ${styleClass}`}>
                    
                    {/* LAYOUT: IDENTIDADE (Mission, Vision, Values) */}
                    {card.type === 'identity' && (
                        <div className="w-full max-w-6xl h-full max-h-[70vh] grid grid-rows-2 gap-6">
                            <div className="row-span-1 bg-card border border-border/50 rounded-3xl p-8 flex flex-col justify-center shadow-lg relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/30 uppercase">{card.title}</div>
                                <h3 className="text-accent font-mono text-sm mb-4 uppercase tracking-wider">{card.mission?.title}</h3>
                                <p className="font-heading text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground">{card.mission?.description}</p>
                            </div>
                            <div className="row-span-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col justify-center shadow-lg">
                                    <h3 className="text-accent font-mono text-sm mb-4 uppercase tracking-wider">{card.vision?.title}</h3>
                                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">{card.vision?.description}</p>
                                </div>
                                <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col justify-center shadow-lg">
                                    <h3 className="text-accent font-mono text-sm mb-4 uppercase tracking-wider">{card.values?.title}</h3>
                                    <div className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">{card.values?.description}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LAYOUT: MERCADO/CONTEXTO (Persona, Dor, Solução) */}
                    {card.type === 'market' && (
                        <div className="w-full max-w-6xl bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl h-auto max-h-[80vh] overflow-y-auto custom-scrollbar">
                             <div className="mb-10 text-center">
                                <h3 className="font-heading text-3xl md:text-4xl font-bold">{card.title}</h3>
                                <div className="h-1 w-20 bg-accent mx-auto mt-4" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                                <div className="space-y-4 relative group">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl mb-2">1</div>
                                    <h4 className="text-xl font-bold uppercase tracking-tight text-foreground">{card.persona?.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">{card.persona?.description}</p>
                                    <div className="hidden md:block absolute top-0 right-[-1.5rem] lg:right-[-2rem] w-px h-full bg-border/50" />
                                </div>
                                <div className="space-y-4 relative group">
                                     <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl mb-2">2</div>
                                    <h4 className="text-xl font-bold uppercase tracking-tight text-foreground">{card.pain?.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">{card.pain?.description}</p>
                                    <div className="hidden md:block absolute top-0 right-[-1.5rem] lg:right-[-2rem] w-px h-full bg-border/50" />
                                </div>
                                <div className="space-y-4 relative group">
                                     <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xl mb-2">3</div>
                                    <h4 className="text-xl font-bold uppercase tracking-tight text-foreground">{card.solution?.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">{card.solution?.description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LAYOUT: TEXTO (Genérico) */}
                    {card.type === 'text' && (
                        <div className="w-full max-w-4xl bg-card border border-border/50 rounded-3xl p-8 md:p-16 shadow-2xl">
                             <h3 className="font-heading text-3xl md:text-4xl font-bold mb-8">{card.title}</h3>
                             <div className="prose prose-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {card.textBody}
                             </div>
                        </div>
                    )}

                 </div>
               );
            })}

        </div>

        {/* Indicadores Laterais */}
        <div className="hidden md:flex flex-col items-end justify-center pr-8 w-24 shrink-0">
          <div className="space-y-4">
             {cards.map((_, index) => (
               <div key={index} className={`transition-all duration-300 flex items-center gap-2 justify-end ${index === activeIndex ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`h-[2px] bg-accent transition-all duration-500 ${index === activeIndex ? 'w-8' : 'w-4'}`} />
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PersonasSection;