import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { isLocale, type Locale } from "@/i18n-config";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site-url";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ pro?: string | string[] }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const { pro } = await searchParams;
  const selectedProjectFilter = typeof pro === "string" ? pro : "all";
  const pageUrl = new URL(`/${locale}`, getSiteUrl()).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "ar" ? "يامن بركات" : "Yamen Barakat",
    alternateName: locale === "ar" ? "Yamen Barakat" : "يامن بركات",
    url: pageUrl,
    image: new URL("/images/profile.jpg", getSiteUrl()).toString(),
    jobTitle:
      locale === "ar"
        ? "مبرمج ومطور مواقع ويب"
        : "Full Stack Web Developer",
    description: dictionary.meta.description,
    nationality: {
      "@type": "Country",
      name: locale === "ar" ? "سوريا" : "Syria",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ar" ? "مسقط" : "Muscat",
      addressCountry: "OM",
    },
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Business Websites",
      "Responsive Web Design",
    ],
    sameAs: ["https://github.com/yamenbarakat"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header dictionary={dictionary} locale={locale} />
      <main>
        <Hero dictionary={dictionary} />
        <Services dictionary={dictionary} />
        <Projects
          dictionary={dictionary}
          selectedFilter={selectedProjectFilter}
        />
        <Skills dictionary={dictionary} />
        <Certifications dictionary={dictionary} locale={locale} />
        <About dictionary={dictionary} />
        <Contact dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
