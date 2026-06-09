import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Aref_Ruqaa,
  Baloo_Bhaijaan_2,
  Caveat,
  Fredoka,
  Funnel_Display,
  Geist_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const ibmSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-sans",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Bold, rounded display font for the oversized hero name.
// adjustFontFallback is disabled so Arabic glyphs fall through to the Arabic
// font in the stack instead of matching the metrics-adjusted (Arabic-capable)
// system fallback that next/font would otherwise inject.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

// Handwritten/marker font for the casual "Hello, I'm" + "software engineer" lines
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

// Arabic counterpart of the rounded display font (hero name in RTL)
const balooArabic = Baloo_Bhaijaan_2({
  variable: "--font-baloo-arabic",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

// Arabic handwritten/calligraphic font (counterpart of Caveat in RTL)
const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
      apple: "/coding.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://iabdallah.vercel.app",
      siteName: t("title"),
      images: [
        {
          url: "/coding.png",
          width: 1200,
          height: 630,
          alt: t("description"),
        },
      ],
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  const isRTL = locale === "ar";
  const direction = isRTL ? "rtl" : "ltr";

  const fontVariables = `${funnelDisplay.variable} ${ibmSansArabic.variable} ${geistMono.variable} ${fredoka.variable} ${caveat.variable} ${balooArabic.variable} ${arefRuqaa.variable}`;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              <Header />
              {children}
              <Footer />
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
