"use client";

import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogout, useSession } from "@/features/auth";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function NavUser({ className }: { className?: string }) {
  const router = useRouter();
  const session = useSession();
  const user = session.data;
  const logout = useLogout();

  if (!user) return null;

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("Signed out successfully");
        router.push("/login");
      },
      onError: (err) => {
        toast.error(err.message || "Logout failed");
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl bg-transparent px-3 py-2 text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent",
            className,
          )}
        >
          <Avatar className="size-7 shrink-0 rounded-lg border border-border">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden overflow-hidden">
            <span className="truncate text-xs font-semibold text-foreground">
              {user.name}
            </span>
            <span className="truncate text-[10px] text-muted-foreground">
              {user.email}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex cursor-pointer items-center">
            <UserIcon className="mr-2 size-4" />
            Profile & Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex cursor-pointer items-center">
            <Settings className="mr-2 size-4" />
            Preferences
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
