import { useInView } from '../hooks/useInView';

const IntroductionSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section 
      id="introduction" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">01</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Introdução</h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Main Text */}
          <div className={`transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light leading-relaxed text-foreground mb-8">
              Este brand book é mais do que um guia — é uma imersão na identidade visual e conceptual de uma marca que respira sofisticação.
            </p>
            
            {/* Quote */}
            <blockquote className="border-l-2 border-accent pl-6 py-2">
              <p className="text-lg md:text-xl italic text-foreground">
                "O luxo está nos detalhes que não se veem à primeira vista."
              </p>
            </blockquote>
          </div>

          {/* Right Column - Secondary Index */}
          <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">Conteúdos</p>
            <ul className="space-y-4">
              {[
                'Sobre a marca',
                'Quem é João Fernandes',
                'Propósito da marca',
                'Missão, visão & valores',
                'Público-alvo / Persona',
                'Proposta de valor',
                'Tom de voz e linguagem',
                'Storytelling da marca',
                'Reputação e percepção'
              ].map((item, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-4 group cursor-pointer"
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <span className="text-xs text-muted-foreground font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base md:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
