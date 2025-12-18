// src/app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StatusFilter } from "@/shared/types/client-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { useClientStore } from "@/shared/store/client-store";
import { useAuthStore } from "@/shared/store/auth-store";

export function DashboardModule() {
  const { replace } = useRouter();
  const isAuth = useAuthStore((s) => s.isAuth);
  const logout = useAuthStore((s) => s.logout);
  const { clients, fetchClients, loading, error } = useClientStore();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "paused">("all");

  useEffect(() => {
    if (clients.length > 0) return;
    fetchClients();
  }, [clients.length, fetchClients]);

  useEffect(() => {
    if (!isAuth) replace("/login");
  }, [isAuth, replace]);

  const filtered = clients.filter((c) => {
    if (status !== "all" && c.status !== status) return false;
    return c.companyName.toLowerCase().includes(query.toLowerCase());
  });

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 flex gap-4">
          <Input
            placeholder="Search company..."
            className="max-w-xs"
            onChange={(e) => setQuery(e.target.value)}
          />

          <Select
            onValueChange={(v) => setStatus(v as StatusFilter)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company list</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.companyName}</TableCell>

                  <TableCell>
                    <Badge
                      variant={c.status === "active" ? "default" : "secondary"}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{c.plan}</TableCell>

                  <TableCell className="text-right">
                    ${c.monthlyPrice}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="link">
                      <Link href={`/clients/${c.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
