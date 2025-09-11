import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "../globals.css";
import Header from "@/components/header";

// Configure Geist for Latin characters only
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Configure IBM Plex for Arabic characters only
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
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });

  return {
    title: t("title"),
    description: t("description"),
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

  // All font variables are always loaded
  const fontVariables = `${geistSans.variable} ${ibmSansArabic.variable} ${geistMono.variable}`;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
