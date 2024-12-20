import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { QueryProvider } from "./providers/query-provider";

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Quick Commerce",
  description: "Building the quick commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
