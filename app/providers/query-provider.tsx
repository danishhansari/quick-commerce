"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
  return new QueryClient();
}

function getQueryClient() {
  if (typeof window == "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

const queryClient = getQueryClient();
export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </SessionProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
