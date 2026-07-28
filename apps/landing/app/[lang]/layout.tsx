import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SmoothScroll } from "../_components/SmoothScroll";
import { EasterEgg } from "../_components/EasterEgg";
import { locales } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return params.then(({ lang }) => ({
    title: "Pixl — A pixel-art YSWS",
    description:
      "Ship projects inside a story-driven game, get real prizes to your door. Join the restoration of Pixl.",
    icons: { icon: "/favicon.png" },
    metadataBase: new URL("https://pixl.rsvp"),
    openGraph: {
      title: "Pixl — A pixel-art YSWS",
      description:
        "Ship projects inside a story-driven game, get real prizes to your door.",
      url: `https://pixl.rsvp/${lang}`,
      siteName: "Pixl",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Pixl — A pixel-art YSWS",
        },
      ],
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : lang === "fr" ? "fr_FR" : lang === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pixl — A pixel-art YSWS",
      description:
        "Ship projects inside a story-driven game, get real prizes to your door.",
      images: ["/og-image.png"],
    },
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
        fr: "/fr",
        pt: "/pt",
      },
    },
  }));
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
        <EasterEgg />
      </body>
    </html>
  );
}
