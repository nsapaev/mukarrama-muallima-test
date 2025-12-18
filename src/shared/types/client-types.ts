export type ClientStatus = "active" | "paused";
export type Plan = "Starter" | "Pro" | "Enterprise";
export type StatusFilter = "all" | "active" | "paused";

export interface Client {
  id: string;
  companyName: string;
  status: ClientStatus;
  plan: Plan;
  monthlyPrice: number;
  connectedAt: string;
}
