import { create } from 'zustand';
import { api } from '@/lib/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),

  login: (token: string) => {
    localStorage.setItem('auth_token', token);
    // Configura o token no cabeçalho padrão do Axios
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
    set({ token: null, isAuthenticated: false });
  }
}));

// Inicializa o axios com o token se ele já existir no storage (recarregamento de página)
const token = localStorage.getItem('auth_token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}