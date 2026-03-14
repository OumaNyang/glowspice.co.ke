import type { Metadata } from "next";
import { Rubik ,Google_Sans} from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

// const plus_jakarta_sans = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   variable: "--font-jakarta", // keeping the CSS variable name identical to avoid globals.css changes
//   display: "swap",
//   adjustFontFallback: false,
// });

const google_sans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans", // keeping the CSS variable name identical to avoid globals.css changes
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable}   ${google_sans.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
