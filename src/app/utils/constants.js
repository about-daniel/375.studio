export const FALLBACK_SEO = {
    title: "Studio375 :: Creative Digital Studio",
    description: "Creative Digital Studio",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.SITE_URL}`,
      siteName: "Studio375 - Creative Digital Studio",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
    },
}