import Image from "next/image";
import { FiArrowDown as ArrowDown } from "react-icons/fi";
import { HeroBackground } from "@/components/hero-background";
import type { Dictionary } from "@/get-dictionary";

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-4 px-6 py-28 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <div className="w-full flex-1 text-center md:text-start">
          <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
            {dictionary.hero.eyebrow}
          </p>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-5xl lg:text-6xl text-balance">
            {dictionary.hero.titleBefore}
            <br />
            <span className="text-primary">
              {dictionary.hero.titleHighlight}
            </span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dictionary.hero.description}
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            {dictionary.hero.cta}
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mt-4 hidden w-[min(280px,85vw)] shrink-0 md:mt-0 md:block md:w-[min(540px,100%)]">
          <Image
            src="/images/photo_transparent.png"
            alt={dictionary.about.imageAlt}
            width={540}
            height={800}
            priority
            fetchPriority="high"
            sizes="540px"
            className="h-auto w-auto max-w-full object-contain drop-shadow-2xl md:max-h-[min(900px,100vh)]"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5">
          <div className="h-2 w-1 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
