import type React from "react";
import type { Metadata } from "next";
import { Golos_Text, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/atoms/sonner";
import { getCsp } from "@/lib/config/csp";

const golos = Golos_Text({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const isDev = process.env.NODE_ENV === "development";

const CSP = getCsp(isDev);

export const metadata: Metadata = {
  metadataBase: new URL("https://olivetocontabilidade.com"),
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "Oliveto | Perícia Contábil, Auditoria e Consultoria Empresarial",
    template: "%s | Oliveto Contabilidade",
  },
  description:
    "Escritório de Contabilidade em Londrina especializado em Perícia Contábil, Auditoria, Valuation e Gestão Financeira. Soluções técnicas para advogados e empresas.",
  keywords: [
    "Perícia Contábil",
    "Auditoria",
    "Contabilidade Londrina",
    "Consultoria Empresarial",
    "Perito Contábil",
    "Cálculos Judiciais",
    "Recuperação Tributária",
    "Valuation",
    "Augusto Favareto",
    "Murilo de Oliveira",
    "Oliveto",
  ],
  authors: [
    { name: "Augusto Favareto" },
    { name: "Murilo de Oliveira" },
    { name: "T_YOU", url: "https://www.tyou.com.br/" },
  ],
  creator: "Oliveto Contabilidade",
  publisher: "Oliveto Contabilidade",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/simbolo_branco.png",
    shortcut: "/simbolo_branco.png",
    apple: "/simbolo_branco.png",
  },
  openGraph: {
    title: "Oliveto | Perícia, Contabilidade e Auditoria",
    description:
      "Excelência técnica e visão estratégica em Perícia Contábil e Auditoria. Atedimento em Londrina e região.",
    url: "https://olivetocontabilidade.com",
    siteName: "Oliveto Contabilidade",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Oliveto Contabilidade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oliveto | Perícia e Auditoria Contábil",
    description:
      "Soluções em Perícia, Auditoria e Contabilidade Consultiva. Transformando dados em clareza e resultados.",
    images: ["/logo.png"],
    creator: "@olivetocont",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
      </head>
      <body
        className={`${golos.variable} ${outfit.variable} font-sans antialiased`}
      >
        <QueryProvider>
            {children}
            <Toaster />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
