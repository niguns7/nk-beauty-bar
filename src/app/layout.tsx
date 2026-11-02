import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BLUSH — NK Beauty Bar | Modern Beauty Salon in Texas",
  description:
    "Where subtle elegance meets thoughtful care. Boutique threading, tinting, hair styling, waxing, customized facials, and Japanese head-spa rituals in Texas.",
  keywords: [
    "NK Beauty Bar",
    "BLUSH Beauty Bar",
    "Eyebrow Threading Texas",
    "Head Spa Texas",
    "Customized Facials",
    "Hair Styling Texas",
    "Waxing Studio",
    "Boutique Salon",
  ],
  openGraph: {
    title: "BLUSH — NK Beauty Bar | Texas Salon Sanctuary",
    description:
      "Personalized threading, tinting, hair, waxing, facial and head-spa services—created to help you feel polished, refreshed and completely yourself.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f4f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f8f4f1] text-[#271e20] font-sans selection:bg-[#e89ab2]/30 selection:text-[#8e3f5c] flex flex-col relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
