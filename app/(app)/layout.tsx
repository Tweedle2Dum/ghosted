"use client";

import { PageContainer } from "@/shared/ui/page-container";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AppHeader, AppSidebar, DashboardBackground } from "@/widgets";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset className="relative min-h-screen bg-background">
        <DashboardBackground />
        <AppHeader />
        <main className="flex-1 py-6">
          <PageContainer>{children}</PageContainer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
