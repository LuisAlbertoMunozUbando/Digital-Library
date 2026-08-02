import type { Metadata } from "next";
import "./globals.css";
import "./covers.css";

export const metadata: Metadata = {
  title: "Alberto Muñoz’s Digital Library",
  description:
    "Research papers, teaching materials, technical reports, notebooks and articles by Alberto Muñoz.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
