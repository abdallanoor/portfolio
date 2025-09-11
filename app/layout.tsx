import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdallah Noor",
  description: "Portfolio website of Abdallah Noor, Software Engineer.",
  icons: {
    icon: "./favicon.ico",
    apple: "/coding.png",
  },
  openGraph: {
    title: "Abdallah Noor",
    description: "Portfolio website of Abdallah Noor, Software Engineer.",
    url: "https://abdallahn.vercel.app",
    siteName: "Abdallah Noor",
    images: [
      {
        url: "/coding.png",
        width: 1200,
        height: 630,
        alt: "Abdallah Noor Portfolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
