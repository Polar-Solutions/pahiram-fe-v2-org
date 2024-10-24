import type {Metadata} from "next";
import NextTopLoader from 'nextjs-toploader';

import ClientLayout from "./client-layout";
import '@radix-ui/themes/styles.css';


// Metadata configuration (server-side only)
export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.APP_URL
            ? `${process.env.APP_URL}`
            : process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : `http://localhost:${process.env.PORT || 3000}`
    ),
    title: "Pahiram",
    description: "A Web-Based Lending System For APC",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        url: "/",
        title: "Pahiram",
        description: "A Web-Based Lending System For APC",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pahiram",
        description: "A Web-Based Lending System For APC",
    },
};

// Main layout
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <NextTopLoader
            color="#F1CB0E"
            height={2}         // Height of 4px
            showSpinner={false} // Disable spinner
            shadow="0 0 10px #FFFF00, 0 0 5px #FFFF00" // Custom yellow shadow
        />
        {/* Client-side layout */}
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}

export const dynamic = "force-dynamic";

export const dynamicParams = true;
