import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  preload: false,
});
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = await getDictionary(locale);
  const canonicalPath = `/${locale}`;
  const socialImage = "/og.png";

  return {
    metadataBase: getSiteUrl(),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: [
      "Yamen",
      "Full Stack Developer",
      "Next.js Developer",
      "Frontend Developer Syria",
      "React Specialist",
      "يامن",
      "مطور مواقع ويب",
    ],
    authors: [{ name: "Yamen Barakat", url: canonicalPath }],
    creator: "Yamen Barakat",
    publisher: "Yamen Barakat",
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      siteName: "Yamen Barakat Portfolio",
      locale: locale === "ar" ? "ar_OM" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_OM"],
      images: [
        {
          url: socialImage,
          alt: dictionary.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [socialImage],
    },
    verification: {
      google: "AUWQocc6IsHHaayif9En-t3AZvaOM7jxqCsVI0c4UG4",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cairo.variable} ${locale === "ar" ? "font-arabic" : "font-sans"} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
