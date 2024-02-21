import { fetchAPI } from "./fetch-api";
import { getSingleBySlug } from "./get-single-by-slug";
import { FALLBACK_SEO } from "./constants";

export async function getSeoMetadata(path, slug = false) {
  const content = slug
    ? await getSingleBySlug(path, slug)
    : await fetchAPI(path, { populate: "deep" });
  const seo = content.attributes?.Seo;
  if (!seo?.metaTitle) return FALLBACK_SEO;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.SITE_URL}`,
      siteName: "Studio375 - Creative digital studio",
      images: `${process.env.STRAPI_ENDPOINT}${seo.ogImage?.data.attributes.url}`,
    },
    alternates: {
      canonical: `${process.env.SITE_URL}${path}${slug ? `/${slug}` : ""}`,
      // languages: {
      //   'en-US': 'https://nextjs.org/en-US',
      //   'de-DE': 'https://nextjs.org/de-DE',
      // }
    },
    robots: {
      index: seo.indexable ? true : false,
      follow: seo.indexable ? true : false,
      googleBot: {
        index: seo.indexable ? true : false,
        follow: seo.indexable ? true : false,
      },
    },
  };
}
