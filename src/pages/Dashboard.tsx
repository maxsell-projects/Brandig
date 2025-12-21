import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, LogOut, PenTool, Layout, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

interface Project {
  id: number;
  name: string;
  slug: string;
  updated_at: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (error) {
      toast.error("Sessão expirada.");
      logout();
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const createNew = () => {
    // Idealmente seria um Modal do ShadCN, mas o prompt funciona rápido para MVP
    const name = prompt("Nome do Cliente / Projeto:");
    if (name) {
      const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      navigate(`/p/${slug}`); 
      toast.success(`Iniciando projeto: ${name}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Top Bar */}
      <header className="border-b border-border/40 bg-background/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-accent" />
            <span className="font-heading font-bold text-lg">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">Bem-vindo, Admin</span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/login'); }} className="text-muted-foreground hover:text-red-400">
              <LogOut size={16} className="mr-2"/> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 py-12">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-light">Projetos Recentes</h1>
            <p className="text-muted-foreground mt-1">Gerencie os Brand Books dos seus clientes.</p>
          </div>
          <Button onClick={createNew} size="lg" className="shadow-lg hover:scale-105 transition-transform">
            <Plus size={18} className="mr-2"/> Novo Projeto
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-xl bg-muted/20 animate-pulse border border-border/50" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border/30 rounded-2xl">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Layout className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-medium mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground mb-6">Crie o primeiro Brand Book para começar.</p>
            <Button onClick={createNew} variant="outline">Criar Projeto</Button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.id} className="group relative bg-card border border-border/40 rounded-xl overflow-hidden hover:shadow-2xl hover:border-accent/30 transition-all duration-300 flex flex-col">
              
              {/* Capa "Fake" com Gradiente */}
              <div className="h-32 bg-gradient-to-br from-muted via-muted/50 to-background p-6 flex items-end relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />
                <h2 className="font-heading text-2xl font-bold truncate z-10 relative">{p.name}</h2>
              </div>

              {/* Corpo do Card */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <Calendar size={12} />
                    <span>Atualizado em: {new Date(p.updated_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground/60 bg-muted/30 px-2 py-1 rounded w-fit">
                    /p/{p.slug}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link to={`/p/${p.slug}`} className="w-full">
                    <Button variant="default" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <PenTool size={14} className="mr-2" /> Editar
                    </Button>
                  </Link>
                  <a href={`/p/${p.slug}`} target="_blank" rel="noreferrer" className="w-full">
                     <Button variant="outline" className="w-full">
                       <ExternalLink size={14} className="mr-2"/> Visualizar
                     </Button>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;