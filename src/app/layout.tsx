import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Imobly",
  description: "Seu portal de imóveis com anúncios e serviços completos",
  metadataBase: new URL("https://www.seusite.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": 500,
    },
  },

  twitter: {
    card: "summary_large_image",
    site: "@Imobly",
    creator: "@Imobly",
  },

  openGraph: {
    title: "Imobly",
    description: "Seu portal de imóveis com anúncios e serviços completos",
    images: [
      {
        url: "/images/placeholders/real-estate.webp",
        width: 1200,
        height: 630,
        alt: "Imobly",
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
      </head>

      <body className={`${poppins.variable} antialiased`}>
        {children}

        {/* Script recomendado pelo Cloudflare */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="beforeInteractive"
          async
          defer
        />

      </body>
    </html>
  );
}

