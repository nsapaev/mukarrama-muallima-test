import { Client } from "../types/client-types";

export const mockClients: Client[] = [
  {
    id: "1",
    companyName: "AutoTech LLC",
    status: "active",
    plan: "Pro",
    monthlyPrice: 99,
    connectedAt: "2024-01-12",
  },
  {
    id: "2",
    companyName: "QR Systems",
    status: "paused",
    plan: "Starter",
    monthlyPrice: 29,
    connectedAt: "2023-11-03",
  },
];
