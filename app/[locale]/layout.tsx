import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { DictionaryProvider } from "@/components/dictionary-provider";
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

  return {
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
    authors: [{ name: "Yamen" }],
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
  const dictionary = await getDictionary(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cairo.variable} ${locale === "ar" ? "font-arabic" : "font-sans"} antialiased`}
      >
        <DictionaryProvider dictionary={dictionary} locale={locale}>
          {children}
        </DictionaryProvider>
        <Analytics />
      </body>
    </html>
  );
}
