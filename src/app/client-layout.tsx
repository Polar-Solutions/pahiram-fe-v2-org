"use client"; // Enable Client Component

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/themeProvider";
import "../styles/globals.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize React Query client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
