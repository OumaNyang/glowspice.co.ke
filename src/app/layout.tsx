import type { Metadata } from "next";
import { Rubik, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans", // keeping the CSS variable name identical to avoid globals.css changes
  display: "swap",
  adjustFontFallback: false,
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
      <body className={`${rubik.variable} ${plus_jakarta_sans.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
