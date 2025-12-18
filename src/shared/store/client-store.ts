// src/modules/client/client.store.ts
import { create } from "zustand";
import { Client } from "../types/client-types";
import { mockClients } from "../mock/client-mock";

interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => void;
  updateStatus: (id: string, status: Client["status"]) => void;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  loading: false,
  error: null,

  fetchClients: () => {
    set({ loading: true, error: null });

    setTimeout(() => {
      set({ clients: mockClients, loading: false });
    }, 800);
  },

  updateStatus: (id, status) =>
    set((state) => ({
      clients: state.clients.map((c) => (c.id === id ? { ...c, status } : c)),
    })),
}));
