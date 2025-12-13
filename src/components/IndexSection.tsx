import { useInView } from '../hooks/useInView';

const IndexSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const sections = [
    { number: '01', title: 'Introdução', subtitle: 'A essência da marca', href: '#introduction' },
    { number: '02', title: 'Marca', subtitle: 'História e valores', href: '#brand' },
    { number: '03', title: 'Identidade Visual', subtitle: 'Elementos gráficos', href: '#identity' },
    { number: '04', title: 'Tipografia', subtitle: 'Sistema tipográfico', href: '#typography' },
    { number: '05', title: 'Cores', subtitle: 'Paleta cromática', href: '#colors' },
    { number: '06', title: 'Aplicação', subtitle: 'Mockups e exemplos', href: '#application' },
    { number: '07', title: 'Downloads', subtitle: 'Recursos da marca', href: '#downloads' },
    { number: '08', title: 'Créditos', subtitle: 'Equipa criativa', href: '#credits' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="index" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">00</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Índice</h2>
        </div>

        {/* Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {sections.map((section, index) => (
            <button
              key={section.number}
              onClick={() => scrollToSection(section.href)}
              className={`group text-left p-6 md:p-8 rounded-2xl bg-card border border-border/50 card-lift transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-accent font-medium tracking-wider mb-2">
                    {section.number}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndexSection;
