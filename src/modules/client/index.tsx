"use client";

import { useParams } from "next/navigation";
import { useClientStore } from "@/shared/store/client-store";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClientModule() {
  const params = useParams<{ id: string }>();
  const { clients, updateStatus } = useClientStore();

  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    return <p className="p-6 text-muted-foreground">Client not found</p>;
  }

  const isActive = client.status === "active";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{client.companyName}</h1>

        <Badge variant={isActive ? "default" : "secondary"}>
          {client.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plan</span>
            <span>{client.plan}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly price</span>
            <span>${client.monthlyPrice}</span>
          </div>

          <Button
            variant={isActive ? "outline" : "default"}
            onClick={() =>
              updateStatus(client.id, isActive ? "paused" : "active")
            }
          >
            {isActive ? "Pause client" : "Activate client"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected objects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="border rounded-md px-3 py-2">Vehicle #1</li>
            <li className="border rounded-md px-3 py-2"> QR #234</li>
            <li className="border rounded-md px-3 py-2"> Device A12</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
