import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amnesia.ai"),
  title: {
    default: "Amnesia — AI, который умеет забывать",
    template: "%s · Amnesia",
  },
  description:
    "Amnesia — privacy-first AI-ассистент, который умеет забывать: фильтрует шум, анонимизирует PII и архивирует неактуальное. 100% локально, 0 трекеров, GDPR compliant.",
  keywords: [
    "AI-ассистент",
    "privacy",
    "приватность",
    "анонимизация",
    "PII",
    "GDPR",
    "локальный AI",
    "забывание",
    "Amnesia",
  ],
  authors: [{ name: "Amnesia Team", url: "https://amnesia.ai" }],
  creator: "Amnesia",
  publisher: "Amnesia",
  applicationName: "Amnesia",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://amnesia.ai",
    siteName: "Amnesia",
    title: "Amnesia — AI, который умеет забывать",
    description:
      "Privacy-first AI-ассистент: фильтрует шум, анонимизирует PII, архивирует неактуальное. 100% локально, 0 трекеров.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Amnesia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amnesia — AI, который умеет забывать",
    description:
      "Privacy-first AI-ассистент: фильтрует шум, анонимизирует PII, архивирует неактуальное. 100% локально, 0 трекеров.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="font-sans">{children}</body>
    </html>
  );
}
