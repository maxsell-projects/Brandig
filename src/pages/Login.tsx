import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/login', { email, password });
      login(response.data.access_token);
      toast.success('Acesso autorizado.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground">
      
      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 border-r border-border/10">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-10 duration-500">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-light tracking-tight">
              Brand <span className="font-bold text-accent">Manager</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Entre para gerenciar seus projetos de identidade.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Email corporativo" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="h-12 bg-muted/30 border-border/50 focus-visible:ring-accent"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Senha de acesso" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="h-12 bg-muted/30 border-border/50 focus-visible:ring-accent"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium transition-all" 
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isLoading ? 'Autenticando...' : 'Acessar Dashboard'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground pt-4">
            Sistema protegido. Acesso restrito a administradores.
          </p>
        </div>
      </div>

      {/* Lado Direito - Decorativo (Só aparece em telas grandes) */}
      <div className="hidden lg:flex w-1/2 bg-muted/5 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />
        <div className="absolute w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 p-12 text-center max-w-lg space-y-6">
          <blockquote className="font-heading text-4xl leading-tight">
            "Design is the silent ambassador of your brand."
          </blockquote>
          <div className="h-px w-20 bg-accent mx-auto" />
          <p className="text-sm font-mono uppercase tracking-[0.3em] opacity-50">Paul Rand</p>
        </div>
      </div>

    </div>
  );
};

export default Login;