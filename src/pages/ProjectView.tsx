import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importante para ler a URL
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IndexSection from '@/components/IndexSection';
import IntroductionSection from '@/components/IntroductionSection';
import AboutBrandSection from '@/components/AboutBrandSection';
import BrandSection from '@/components/BrandSection';
import IdentitySection from '@/components/IdentitySection';
import TypographySection from '@/components/TypographySection';
import ColorsSection from '@/components/ColorsSection';
import ApplicationSection from '@/components/ApplicationSection';
import DownloadsSection from '@/components/DownloadsSection';
import CreditsSection from '@/components/CreditsSection';
import AmbientGlow from '@/components/AmbientGlow';
import { useAudio } from '@/hooks/useAudio';
import { BrandEditor } from '@/components/editor/BrandEditor';
import { useBrandStore } from '@/store/useBrandStore';
import { useAuthStore } from '@/store/useAuthStore'; // Importante para verificar o login

const ProjectView = () => {
  // 1. Pegar o slug da URL (ex: site.com/p/nike -> slug = "nike")
  const { slug } = useParams();

  const { isPlaying, toggle } = useAudio('/ambient-sound.mp3');
  const loadProject = useBrandStore((state) => state.loadProject);
  
  // 2. Verificar se o usuário é admin/logado
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // 3. Carregar o projeto baseado na URL (se existir slug)
    if (slug) {
      loadProject(slug);
    }
  }, [slug, loadProject]);

  return (
    <div className="relative min-h-screen bg-background">
      <AmbientGlow />
      
      <Navigation 
        onSoundToggle={toggle}
        isSoundEnabled={isPlaying}
      />
      
      <main className="relative z-10">
        <HeroSection />
        
        <div className="content-container px-6 md:px-12 lg:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <IndexSection />
        
        <div className="content-container px-6 md:px-12 lg:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <IntroductionSection />
        <AboutBrandSection />
        <BrandSection />
        <IdentitySection />
        <TypographySection />
        <ColorsSection />
        <ApplicationSection />
        <DownloadsSection />
        <CreditsSection />
        
        <footer className="section-padding border-t border-border/50">
          <div className="content-container text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Sensorial. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>

      {/* 4. Mostrar o Editor APENAS se estiver logado */}
      {isAuthenticated && <BrandEditor />}
    </div>
  );
};

export default ProjectView;