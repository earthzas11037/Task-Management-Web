import { create } from 'zustand';
import Cookies from 'js-cookie';
import { login, logout, signup } from '../../services/api/auth';
import { TOKEN_COOKIE } from '../../common/contants';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get(TOKEN_COOKIE) ?? null,
  isAuthenticated: !!Cookies.get(TOKEN_COOKIE),

  login: async (email, password) => {
    const { token } = await login({ email, password });
    Cookies.set(TOKEN_COOKIE, token, { expires: 7 });
    set({ token, isAuthenticated: true });
  },

  signup: async (email, password) => {
    const { token } = await signup({ email, password });
    Cookies.set(TOKEN_COOKIE, token, { expires: 7 });
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    await logout();
    Cookies.remove(TOKEN_COOKIE);
    set({ token: null, isAuthenticated: false });
  },

  setToken: (token: string) => {
    Cookies.set(TOKEN_COOKIE, token, { expires: 7 });
    set({ token, isAuthenticated: true });
  },

  clearToken: () => {
    Cookies.remove(TOKEN_COOKIE);
    set({ token: null, isAuthenticated: false });
  },
}));
