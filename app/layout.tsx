import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import "./globals.css";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata",
  });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
