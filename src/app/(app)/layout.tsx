import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import { AdminBar } from "@/components/AdminBar"
import { draftMode } from "next/headers"
import { Nav } from "@/components/Nav"

import localFont from "next/font/local"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { getCachedGlobal } from "@/utils/getGlobals"

const gilroy = localFont({
  src: [
    {
      path: "../fonts/gr-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/gr-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/gr-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/gr-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gilroy",
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal("settings")()

  // OpenGraph tags are not defined here, we define these on each page.tsx
  // This is because Next.js doesn't merge the opengraph properties
  //
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: {
      template: `%s | ${siteSettings.website_title}`,
      default: siteSettings.website_title,
    },
    description: siteSettings.seo.description,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en">
      <body
        className={`${gilroy.variable} font-sans antialiased`}
      >
        <Nav />
        {children}
        <AdminBar draft={isEnabled} />
        <Footer />
      </body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      )}
    </html>
  )
}
