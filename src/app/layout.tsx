import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import styles from "@/components/layout/layout.module.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://tieallen.com'), // Assuming tieallen.com, please update if different
  title: {
    default: "made by tie | Concept to Scale",
    template: "%s | made by tie",
  },
  description:
    "I design, build, and scale premium digital products - from concept through launch and beyond.",
  openGraph: {
    title: "made by tie | Concept to Scale",
    description: "I design, build, and scale premium digital products - from concept through launch and beyond.",
    url: "https://tieallen.com",
    siteName: "made by tie",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/tie-sitting-infront-logo.png",
        width: 1200,
        height: 630,
        alt: "made by tie | Concept to Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "made by tie | Concept to Scale",
    description: "I design, build, and scale premium digital products - from concept through launch and beyond.",
    images: ["/assets/tie-sitting-infront-logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Script
          src="https://app.vizonos.com/tracking/vizon-tracker.js"
          data-vizon-tracking="94db9f1451895f07bad80546"
          strategy="afterInteractive"
        />
        
        <div id="page-wrapper" className={styles.pageWrapper}>
          <Header />
          <div id="page-content" className={styles.pageContent}>
            <main className={styles.mainContent}>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

