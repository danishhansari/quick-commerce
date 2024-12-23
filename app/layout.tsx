import "./globals.css";

import { Inter } from "next/font/google";
import { QueryProvider } from "./providers/query-provider";
import Script from "next/script";

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Quick Commerce",
  description: "Building the quick commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
