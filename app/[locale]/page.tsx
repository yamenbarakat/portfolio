import { Suspense } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/get-dictionary";
import { isLocale } from "@/i18n-config";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const dictionary = await getDictionary(localeParam);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense
          fallback={
            <div className="py-24 text-center text-muted-foreground">
              {dictionary.projects.loading}
            </div>
          }
        >
          <Projects />
        </Suspense>
        <Skills />
        <Certifications />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
