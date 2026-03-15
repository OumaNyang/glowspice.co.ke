import type { Metadata } from "next";
import { Rubik, Outfit } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  adjustFontFallback: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glowspice.co.ke"),
  title: {
    default: "GlowSpice — Premium Spices & Herbs, Nairobi Kenya",
    template: "%s | GlowSpice",
  },
  description:
    "Shop the world's finest spices, herbs, spice blends, and natural additives. Fresh from source, delivered across Kenya. Premium quality, authentic flavours.",
  keywords: ["spices", "herbs", "Kenya", "Nairobi", "cooking", "garam masala", "turmeric", "saffron", "glowspice"],
  authors: [{ name: "GlowSpice Kenya" }],
  creator: "GlowSpice",
  publisher: "GlowSpice",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://glowspice.co.ke",
    siteName: "GlowSpice",
    title: "GlowSpice — Premium Spices & Herbs",
    description: "The world's finest spices, herbs & blends, delivered across Kenya.",
    images: [
      {
        url: "/og-image.jpg", // Placeholder - user should add this to public/
        width: 1200,
        height: 630,
        alt: "GlowSpice Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowSpice — Premium Spices & Herbs",
    description: "The world's finest spices, herbs & blends, delivered across Kenya.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/images/favicon/site.webmanifest",
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">

      <body className={`${rubik.variable} ${outfit.variable} font-body antialiased`}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
