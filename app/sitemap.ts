import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const languages = Object.fromEntries(
    i18n.locales.map((locale) => [
      locale,
      new URL(`/${locale}`, siteUrl).toString(),
    ]),
  );

  return i18n.locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
