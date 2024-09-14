import type { Metadata } from "next";
import ClientLayout from "./client-layout";

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
    <html lang="en">
      <body>
        {/* Client-side layout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";

export const dynamicParams = true;
