"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store";

export default function Home() {
  const isAuth = useAuthStore((s) => s.isAuth);
  if (!isAuth) redirect("/login");
  redirect("/dashboard");
}
