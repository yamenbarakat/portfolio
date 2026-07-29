"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { useDictionary } from "@/components/dictionary-provider";

export function About() {
  const { dictionary } = useDictionary();
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 });
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { threshold: 0.1 });

  return (
    <section
      id="about"
      className="border-t border-border bg-card/50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">
            {dictionary.about.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {dictionary.about.title}
          </h2>
        </div>

        <div
          ref={contentRef}
          className={`flex flex-col items-center gap-12 md:flex-row md:gap-16 transition-all duration-700 ease-out ${
            isContentInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex-1 space-y-5">
            <p className="leading-relaxed text-muted-foreground">
              {dictionary.about.p1Before}{" "}
              <span className="font-semibold text-foreground">
                {dictionary.about.p1Name}{" "}
              </span>
              {dictionary.about.p1After}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {dictionary.about.p2}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {dictionary.about.p3}
            </p>
          </div>

          <div className="shrink-0">
            <div className="relative">
              <div className="h-72 w-72 overflow-hidden rounded-full border-2 border-border bg-card/50 md:h-80 md:w-80">
                <Image
                  src="/images/profile.jpg"
                  alt={dictionary.about.imageAlt}
                  fill
                  sizes="(min-width: 768px) 20rem, 18rem"
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
