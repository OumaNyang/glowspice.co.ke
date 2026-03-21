import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const avenir = localFont({
  src: [
    { path: "../../public/fonts/Avenir/AvenirLTStd-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Avenir/AvenirLTStd-Book.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Avenir/AvenirLTStd-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Avenir/AvenirLTStd-Heavy.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Avenir/AvenirLTStd-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glowspice.shop"),
  title: {
    default: "GlowSpice — Premium Spices & Herbs, Nairobi Kenya",
    template: "%s | GlowSpice",
  },
  description:"Shop the world's finest spices, herbs, spice blends, and natural additives. Fresh from source, delivered across Kenya. Premium quality, authentic flavours.",
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
    url: "https://glowspice.shop",
    siteName: "GlowSpice",
    title: "GlowSpice - Premium Spices & Herbs",
    description: "The world's finest spices, herbs & blends, delivered across Kenya.",
    images: [
      {
        url: "/og-image.jpg", // Placeholder - user should add this to public/
        width: 1200,
        height: 630,
        alt: "GlowSpice",
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
      <body className={`${avenir.variable} antialiased`}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
