// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { InlineEditorProvider } from "@/contexts/inline-editor-context"
import { SiteTitle } from "@/components/site-title"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "유복길",
    template: "%s | 유복길",
  },
  description: "창의적인 아이디어로 웹 경험을 디자인합니다.",
  keywords: ["포트폴리오", "개발자", "프론트엔드", "웹개발"],
  authors: [{ name: "유복길" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "유복길",
    description: "창의적인 아이디어로 웹 경험을 디자인합니다.",
    siteName: "유복길",
    images: [
      {
        url: "/api/og-image",
        width: 1200,
        height: 630,
        alt: "유복길 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "유복길",
    description: "창의적인 아이디어로 웹 경험을 디자인합니다.",
    images: ["/api/og-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* 카카오톡 공유 최적화 */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="font-pretendard" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <InlineEditorProvider>
            <SiteTitle />
            {children}
          </InlineEditorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
