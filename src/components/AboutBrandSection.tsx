import { useInView } from '../hooks/useInView';

const AboutBrandSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section 
      id="sobre-marca" 
      ref={ref}
      className="section-padding relative"
    >
      <div className="content-container">
        {/* Section Header */}
        <div className={`mb-12 md:mb-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">02</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">Sobre a Marca</h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Main Text */}
          <div className={`transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light leading-relaxed text-foreground">
              Uma marca que nasce da paixão pelo detalhe e da busca incansável pela excelência em cada experiência.
            </p>
          </div>

          {/* Right Column - Details */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A nossa identidade é construída sobre pilares sólidos de autenticidade, sofisticação e uma conexão genuína com quem nos escolhe.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Cada decisão, cada elemento visual, cada palavra — tudo é pensado para criar uma experiência memorável e distintiva.
            </p>
            
            {/* Quote */}
            <blockquote className="border-l-2 border-accent pl-6 py-2 mt-8">
              <p className="text-lg md:text-xl italic text-foreground">
                "A verdadeira elegância está na simplicidade intencional."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrandSection;
