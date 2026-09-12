"use client";

import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SidebarTrigger } from "@/shared/ui/sidebar";

interface AppHeaderProps {
  title?: string;
  description?: string;
}

export function AppHeader({
  title = "Workspace Overview",
  description,
}: AppHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/20 bg-background/60 px-4 md:px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-accent text-muted-foreground hover:text-foreground" />
        <div className="h-5 w-px bg-border/60 hidden sm:block" />
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-muted-foreground hidden sm:block">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block w-56 lg:w-72">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Quick search (⌘K)..."
            className="h-9 pl-9 text-xs bg-secondary/50 border-border/60"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toast.info(
                  `Searching for "${(e.target as HTMLInputElement).value}"...`,
                );
              }
            }}
          />
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => toast.info("No unread system alerts.")}
          className="relative text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
        </Button>
      </div>
    </header>
  );
}
