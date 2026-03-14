import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GlowSpice — Premium Spices & Herbs, Nairobi Kenya",
    template: "%s | GlowSpice",
  },
  description:
    "Shop the world's finest spices, herbs, spice blends, and natural additives. Fresh from source, delivered across Kenya. Premium quality, authentic flavours.",
  keywords: ["spices", "herbs", "Kenya", "Nairobi", "cooking", "garam masala", "turmeric", "saffron"],
  authors: [{ name: "GlowSpice Kenya" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://glowspice.co.ke",
    siteName: "GlowSpice",
    title: "GlowSpice — Premium Spices & Herbs",
    description: "The world's finest spices, herbs & blends, delivered in Kenya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
