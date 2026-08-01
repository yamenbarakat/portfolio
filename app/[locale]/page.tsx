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

  return (
    <>
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
