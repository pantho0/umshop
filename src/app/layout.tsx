import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
