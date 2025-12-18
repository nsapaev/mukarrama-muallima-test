import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  login: (email, password) => {
    if (email === "admin@example.com" && password === "admin") {
      set({ isAuth: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuth: false }),
}));
