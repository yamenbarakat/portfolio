import Image from "next/image";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/get-dictionary";

export function About({ dictionary }: { dictionary: Dictionary }) {
  const highlights = [
    dictionary.about.highlights.learning,
    dictionary.about.highlights.projects,
    dictionary.about.highlights.languages,
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-white/8 py-24 md:py-32 bg-card/50"
    >
      <div
        className="absolute -end-48 top-32 h-96 w-96 rounded-full bg-[#745cff]/8 blur-[100px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-kicker mb-4">{dictionary.about.eyebrow}</p>
          <h2 className="section-heading max-w-[10ch]">
            {dictionary.about.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] max-h-[660px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.025]">
              <Image
                src="/images/profile.jpg"
                alt={dictionary.about.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover grayscale-[.18] transition duration-700 hover:scale-[1.02] hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080c]/75 via-transparent to-primary/5" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/12 bg-black/35 px-5 py-4 backdrop-blur-xl">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-primary uppercase">
                    Based in
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Muscat, Oman
                  </p>
                </div>
                <span className="status-pulse" />
              </div>
            </div>
            <span className="absolute -end-3 -top-3 grid h-16 w-16 place-items-center rounded-full border border-primary/25 bg-[#090a0e] font-mono text-[10px] text-primary">
              YB®
            </span>
          </Reveal>

          <Reveal className="flex flex-col justify-between" delay={80}>
            <div className="space-y-6 text-base leading-8 text-white/52">
              <p>
                {dictionary.about.p1Before}{" "}
                <span className="font-semibold text-white">
                  {dictionary.about.p1Name}{" "}
                </span>
                {dictionary.about.p1After}
              </p>
              <p>{dictionary.about.p2}</p>
              <p>{dictionary.about.p3}</p>
            </div>

            <div className="mt-14 grid border-y border-white/10 sm:grid-cols-3">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.label}
                  className={`py-6 sm:px-5 ${index > 0 ? "border-t border-white/10 sm:border-s sm:border-t-0" : ""}`}
                >
                  <p className="text-xl font-semibold tracking-[-0.04em] text-primary md:text-2xl">
                    {highlight.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/38 sm:text-sm">
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
