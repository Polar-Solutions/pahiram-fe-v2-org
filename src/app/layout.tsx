import type {Metadata} from "next";
import '@radix-ui/themes/styles.css';

import {GeistSans} from "geist/font/sans";

import {siteConfig} from "@/config/siteConfig"

import "../styles/globals.css";

import {ThemeProvider} from "@/providers/themeProvider";
import { CartProvider } from "@/providers/CartContext";
export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.APP_URL
            ? `${process.env.APP_URL}`
            : process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : `http://localhost:${process.env.PORT || 3000}`
    ),
    title: `${siteConfig.label}`,
    description: `${siteConfig.description}`,
    alternates: {
        canonical: "/"
    },
    openGraph: {
        url: "/",
        title: `${siteConfig.label}`,
        description:
            `${siteConfig.description}`,
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteConfig.label}`,
        description:
            `${siteConfig.description}`,
    }
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
        <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </CartProvider>
        </body>
        </html>
    );
}

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

