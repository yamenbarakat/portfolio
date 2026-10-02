import Image from "next/image";
import { FiMapPin as MapPin } from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/get-dictionary";

export function About({ dictionary }: { dictionary: Dictionary }) {
  const highlights = [
    dictionary.about.highlights.learning,
    dictionary.about.highlights.projects,
    dictionary.about.highlights.languages,
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="section-glow -end-48 top-32 h-96 w-96 bg-ember/10"
        aria-hidden="true"
      />
      <div className="section-shell relative">
        <SectionHeading
          index="05"
          eyebrow={dictionary.about.eyebrow}
          title={dictionary.about.title}
        />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="surface relative aspect-[4/5] max-h-[620px] overflow-hidden rounded-[1.75rem] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[1.35rem]">
                <Image
                  src="/images/profile.jpg"
                  alt={dictionary.about.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 448px) 448px, 100vw"
                  className="object-cover grayscale-[.2] transition duration-700 hover:scale-[1.02] hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-primary/5" />
                <p className="absolute inset-x-6 bottom-6 flex items-center gap-2 text-sm text-foreground/75">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    {dictionary.about.basedIn}{" "}
                    <span className="font-semibold text-foreground">
                      {dictionary.about.location}
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <span
              className="absolute -end-3 -top-3 grid h-16 w-16 place-items-center rounded-full border border-primary/30 bg-background font-mono text-xs font-semibold text-primary shadow-[0_0_40px_-8px_rgba(242,169,59,0.5)]"
              aria-hidden="true"
            >
              YB
            </span>
          </Reveal>

          <Reveal className="flex flex-col justify-between" delay={80}>
            <div className="space-y-6 text-base leading-8 text-muted-foreground md:text-lg md:leading-8">
              <p>
                {dictionary.about.p1Before}{" "}
                <span className="font-semibold text-foreground">
                  {dictionary.about.p1Name}{" "}
                </span>
                {dictionary.about.p1After}
              </p>
              <p>{dictionary.about.p2}</p>
              <p>{dictionary.about.p3}</p>
            </div>

            <div className="surface mt-12 grid overflow-hidden rounded-2xl sm:grid-cols-3">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.label}
                  className={`p-6 ${index > 0 ? "border-t border-border sm:border-s sm:border-t-0" : ""}`}
                >
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-primary md:text-[1.7rem]">
                    {highlight.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {highlight.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
