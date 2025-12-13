import { useInView } from '../hooks/useInView';

const ApplicationSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const mockups = [
    { title: 'Cartão de Visita', description: 'Frente e verso' },
    { title: 'Papel Timbrado', description: 'A4 corporativo' },
    { title: 'Envelope', description: 'Formato C5' },
    { title: 'Website', description: 'Página principal' },
    { title: 'App Mobile', description: 'Interface principal' },
    { title: 'Redes Sociais', description: 'Templates de post' },
  ];

  return (
    <section 
      id="application" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">06</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Aplicação</h2>
        </div>

        {/* Description */}
        <div className={`mb-12 md:mb-16 max-w-2xl transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Exemplos de aplicação da identidade visual em diferentes suportes e contextos, 
            demonstrando a versatilidade e coerência da marca.
          </p>
        </div>

        {/* Mockups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockups.map((mockup, index) => (
            <div
              key={mockup.title}
              className={`group aspect-[4/3] rounded-2xl bg-card border border-border/50 overflow-hidden card-lift transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
            >
              {/* Mockup Preview */}
              <div className="h-full flex flex-col items-center justify-center p-8 relative">
                {/* Placeholder Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-4 border border-current rounded-lg" />
                  <div className="absolute inset-8 border border-current rounded-lg" />
                </div>
                
                {/* Logo Preview */}
                <span className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground/30 group-hover:text-foreground/50 transition-colors duration-300">
                  SENSORIAL
                </span>
                
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-card to-transparent">
                  <h4 className="font-heading font-medium text-foreground">{mockup.title}</h4>
                  <p className="text-sm text-muted-foreground">{mockup.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;
