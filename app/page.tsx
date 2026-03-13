import { Suspense } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="py-24">Loading projects…</div>}>
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
