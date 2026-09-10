"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { UserRole } from "@/entities/user";

export function RoleGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const role = (() => {
    const topLevelRole = searchParams.get("role") as UserRole | null;
    if (
      topLevelRole === "admin" ||
      topLevelRole === "member" ||
      topLevelRole === "creator" ||
      topLevelRole === "guest"
    ) {
      return topLevelRole;
    }
    return null;
  })();

  useEffect(() => {
    if (!role) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("role", "admin");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [role, pathname, router, searchParams]);

  return null;
}
