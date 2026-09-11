import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/app";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/ui/sonner";

const clashGrotesk = localFont({
  src: "../public/fonts/clash-grotesk/ClashGrotesk-Variable.woff2",
  variable: "--font-clash-grotesk",
  weight: "200 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ghosted | Autonomous Workspace",
  description:
    "Next-generation engineering workspace built with Feature-Sliced Design precision.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", clashGrotesk.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={cn(clashGrotesk.variable, "antialiased")}>
        <AppProvider>
          {children}
          <Toaster position="top-right" richColors duration={3500} />
        </AppProvider>
      </body>
    </html>
  );
}
