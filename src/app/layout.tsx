import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "@/lib/Providers/Providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "UmShop",
  description: "UmShop || Your trusted online store ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Toaster position="top-center" richColors duration={2000} />
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </Providers>
  );
}
