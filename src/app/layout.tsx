import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "@/lib/Providers/Providers";

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
      <html lang="en">
        <body className="antialiased overflow-x-hidden">{children}</body>
      </html>
    </Providers>
  );
}
