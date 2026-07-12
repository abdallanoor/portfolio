"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Caveat } from "next/font/google";
import localFont from "next/font/local";

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
      path: "../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahsans/woff2/thmanyahsans-Black.woff2",
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
      path: "../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Black.woff2",
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
      path: "../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/thmanyah typeface/thmanyahseriftext/woff2/thmanyahseriftext-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-serif-text",
  display: "swap",
});

const translations = {
  en: {
    title: "Page Not Found",
    description:
      "It looks like you took a wrong turn, or this page has been moved to another address.",
    homeButton: "Back to Home",
  },
  ar: {
    title: "الصفحة غير موجودة",
    description:
      "يبدو أنك سلكت طريقاً خاطئاً أو أن الصفحة قد تم نقلها إلى عنوان آخر.",
    homeButton: "العودة للرئيسية",
  },
};

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsArabic(window.location.pathname.startsWith("/ar"));
    }
  }, []);

  if (!mounted) {
    return (
      <html lang="en" dir="ltr" suppressHydrationWarning>
        <body className="bg-[#f6f4ee] dark:bg-[#121212]" />
      </html>
    );
  }

  const locale = isArabic ? "ar" : "en";
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[locale];

  const fontVariables = `${thmanyahSans.variable} ${thmanyahSerifDisplay.variable} ${thmanyahSerifText.variable} ${caveat.variable}`;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${fontVariables} antialiased bg-background text-foreground min-h-screen flex flex-col justify-between`}
      >
        {/* Simple Header */}
        <header className="container py-6 flex items-center justify-between">
          <Link
            href={isArabic ? "/ar" : "/"}
            className="font-sans text-xl font-bold tracking-tight text-primary"
          >
            {isArabic ? "عبدالله." : "Abdallah."}
          </Link>
        </header>

        {/* Themed Main Content */}
        <main className="container flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="flex flex-col items-center max-w-xl">
            {/* Hand-drawn caption above the 404 */}
            <span className="font-hand text-2xl md:text-3xl text-foreground/75 rotate-[-4deg] translate-y-3 select-none">
              {isArabic ? "عذراً، هذا محرج..." : "well, this is awkward..."}
            </span>

            {/* Giant 404 text using Serif Display (Light/Medium weights are very elegant) */}
            <h1
              className="text-[9rem] md:text-[12rem] font-light leading-none tracking-tight text-primary select-none"
              style={{
                fontFamily: "var(--font-thmanyah-serif-display), serif",
              }}
            >
              404
            </h1>

            {/* Title */}
            <h2 className="mt-4 font-sans text-lg md:text-xl font-bold tracking-tight text-primary/80">
              {t.title}
            </h2>

            {/* Description using correct Serif Text font */}
            <p
              className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg"
              style={{ fontFamily: "var(--font-thmanyah-serif-text), serif" }}
            >
              {t.description}
            </p>

            {/* Clean, themed return button */}
            <div className="mt-12">
              <Button asChild size="lg" variant="secondary">
                <Link href={isArabic ? "/ar" : "/"}>
                  <span>{t.homeButton}</span>
                </Link>
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container py-6 text-center text-xs text-muted-foreground">
          {isArabic
            ? "© ٢٠٢٥ عبدالله نور. لا توجد حقوق محفوظة."
            : "© 2025 Abdallah Noor. No rights reserved."}
        </footer>
      </body>
    </html>
  );
}
