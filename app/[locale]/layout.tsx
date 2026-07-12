import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Caveat } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const thmanyahSans = localFont({
  src: [
    {
      path: "../../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-sans",
  display: "swap",
});

const thmanyahSerifDisplay = localFont({
  src: [
    {
      path: "../../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-serif-display",
  display: "swap",
});

const thmanyahSerifText = localFont({
  src: [
    {
      path: "../../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-serif-text",
  display: "swap",
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

  const fontVariables = `${thmanyahSans.variable} ${thmanyahSerifDisplay.variable} ${thmanyahSerifText.variable} ${caveat.variable}`;

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
