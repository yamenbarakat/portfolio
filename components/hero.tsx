import type { CSSProperties } from "react";
import Image from "next/image";
import {
  FiArrowDown as ArrowDown,
  FiArrowUpRight as ArrowUpRight,
} from "react-icons/fi";
import { DotTrail } from "@/components/dot-trail";
import { HeroBackground } from "@/components/hero-background";
import { HeroOrbit } from "@/components/hero-orbit";
import type { Dictionary } from "@/get-dictionary";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <HeroBackground />
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-32 pb-24 md:grid-cols-[1.1fr_0.9fr] md:pt-28 md:pb-16">
        <div className="text-center md:text-start">
          <p
            className="hero-rise inline-flex items-center gap-3 text-base text-muted-foreground"
            style={delay(60)}
          >
            <DotTrail />
            {dictionary.hero.eyebrow}
          </p>

          <h1
            className="hero-rise mt-8 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.25rem] text-balance"
            style={delay(140)}
          >
            {dictionary.hero.titleBefore}
            <span className="display-accent text-gradient-amber mt-1 block pb-2">
              {dictionary.hero.titleHighlight}
            </span>
          </h1>

          <p
            className="hero-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg"
            style={delay(240)}
          >
            {dictionary.hero.description}
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            style={delay(340)}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_rgba(242,169,59,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_rgba(242,169,59,0.75)]"
            >
              {dictionary.hero.cta}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-primary/40 hover:text-primary"
            >
              {dictionary.nav.contact}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="relative hidden justify-self-center md:block md:justify-self-end">
          <div className="hero-photo-in relative aspect-[540/960] w-[min(480px,40vw,calc(88svh*0.5625))]">
            <HeroOrbit />
            <div
              className="absolute inset-x-[8%] bottom-[3%] h-16 rounded-[100%] bg-primary/15 blur-2xl"
              aria-hidden="true"
            />
            <Image
              src="/images/photo_transparent.png"
              alt={dictionary.about.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="480px"
              className="hero-photo-mask z-10 object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>

      <div className="hero-fade" aria-hidden="true" />

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-primary md:flex"
        aria-label={dictionary.nav.services}
      >
        <span className="relative h-12 w-px overflow-hidden bg-border">
          <span className="scroll-line absolute inset-x-0 top-0 h-4 bg-primary" />
        </span>
      </a>
    </section>
  );
}
