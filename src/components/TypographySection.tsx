import { useInView } from '../hooks/useInView';
import { useBrandStore } from '@/store/useBrandStore';

const TypographySection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { typography } = useBrandStore();

  return (
    <section id="typography" ref={ref} className="section-padding relative">
      <div className="content-container">
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">{typography.sectionNumber}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">{typography.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:gap-20">
          
          {/* Fonte Principal */}
          <div className={`transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-6">{typography.primaryFontTitle}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-foreground mb-4">
                  {typography.primaryFontAlphabet.split(' ')[0]} {/* Mostra apenas Aa */}
                </p>
                <p className="text-2xl font-heading">{typography.primaryFontName}</p>
              </div>
              
              <div className="space-y-8">
                <div className="p-6 bg-card border border-border/50 rounded-xl">
                   <p className="font-heading text-lg md:text-xl leading-relaxed break-words">
                     {typography.primaryFontCharacters}
                   </p>
                </div>

                <div>
                  <p className="text-xs text-accent uppercase tracking-widest mb-4">{typography.weightsTitle}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {typography.primaryWeights.map((weight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-sm font-heading" style={{ fontWeight: weight.weight }}>{weight.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fonte Secundária (Condicional) */}
          {typography.secondaryFontName && (
            <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="h-px bg-border/50 w-full mb-12" />
              
              <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-6">{typography.secondaryFontTitle}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                   <p className="text-6xl md:text-8xl font-body font-bold text-foreground mb-4">
                     {typography.secondaryFontAlphabet.split(' ')[0]}
                   </p>
                   <p className="text-2xl font-body">{typography.secondaryFontName}</p>
                </div>

                <div>
                  <p className="text-lg text-muted-foreground mb-8 font-body">
                    {typography.secondaryFontDescription}
                  </p>

                  <div>
                    <p className="text-xs text-accent uppercase tracking-widest mb-4">{typography.secondaryWeightsTitle}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {typography.secondaryWeights.map((weight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-px flex-1 bg-border" />
                          <span className="text-sm font-body" style={{ fontWeight: weight.weight }}>{weight.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fontes Extras (Condicional) */}
          {typography.extraFonts && typography.extraFonts.length > 0 && (
            <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
               <div className="h-px bg-border/50 w-full mb-12" />
               <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-6">Outras Fontes</h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {typography.extraFonts.map((font, idx) => (
                   <div key={idx} className="p-6 border rounded-xl bg-card flex flex-col items-center justify-center text-center gap-4 hover:border-accent/50 transition-colors">
                      {/* Tenta usar a fonte extra se o nome for válido no CSS */}
                      <p className="text-5xl" style={{ fontFamily: font.name.replace(/\s+/g, '') }}>Aa</p>
                      <div>
                        <p className="text-lg font-bold text-foreground">{font.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Fonte Auxiliar</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default TypographySection;