import { Metadata } from "next";
import { TRPCProvider } from "@/libraries/trpc/provider";
import "@/styles/globals.css";
import { inter } from "@/styles/fonts"
export const metadata: Metadata = {
  metadataBase: new URL("https://google.com"),
  title: {
    default: "",
    template: "e",
  },
  description: "",
  openGraph: {
    title: "",
    description: "",
    url: "",
    siteName: "",
    images: [
      {
        url: "",
        width: 2322,
        height: 1306,
      },
    ],
    locale: "fr-FR",
    type: "website",
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
 
  icons: {
    shortcut: "/favicon.png",
  },
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={[inter.variable].join(" ")}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen antialiased">
     
          <TRPCProvider>
            {children}
          </TRPCProvider>
 
      </body>
    </html>
  );
}