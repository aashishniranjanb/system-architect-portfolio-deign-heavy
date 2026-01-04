import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "System Architect | Full Stack Embedded Engineer",
  description: "Designing systems by understanding every layer - from user interface to transistor-level physics.",
  keywords: ["System Architect", "Embedded Systems", "VLSI", "Semiconductor", "Firmware", "Full Stack"],
  authors: [{ name: "System Architect" }],
  openGraph: {
    title: "System Architect | Full Stack Embedded Engineer",
    description: "Designing systems by understanding every layer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0F1216] text-[#E8E8E8]`}
      >
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
