import { useInView } from '../hooks/useInView';

const BrandSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const values = [
    { title: 'Excelência', description: 'Comprometidos com os mais altos padrões em cada detalhe.' },
    { title: 'Autenticidade', description: 'Fiéis à nossa essência, sem comprometer a nossa visão.' },
    { title: 'Inovação', description: 'Explorando novas fronteiras mantendo a elegância atemporal.' },
    { title: 'Sensorialidade', description: 'Criando experiências que envolvem todos os sentidos.' },
  ];

  return (
    <section 
      id="brand" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">02</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Marca</h2>
        </div>

        {/* Mission Statement */}
        <div className={`mb-16 md:mb-24 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl">
            <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-4">Missão</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-light leading-snug text-foreground">
              Elevar o comum ao extraordinário através de experiências visuais que transcendem expectativas.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-accent mb-8">Valores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 card-lift"
                style={{ transitionDelay: `${(index + 3) * 0.1}s` }}
              >
                <h4 className="font-heading text-lg md:text-xl font-medium text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
