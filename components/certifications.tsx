"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  FiX as X,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiMaximize2 as Maximize,
} from "react-icons/fi";
import { useInView } from "@/hooks/use-in-view";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";

type CertKey = keyof Dictionary["certifications"]["items"];

const certifications: {
  key: CertKey;
  issuer: string;
  image: string;
}[] = [
  {
    key: "frontendNano",
    issuer: "Udacity",
    image: "/images/cert-1.png",
  },
  {
    key: "frontendMeta",
    issuer: "Coursera",
    image: "/images/front-end-meta.jpg",
  },
  {
    key: "jsNano",
    issuer: "Udacity",
    image: "/images/cert-2.png",
  },
  {
    key: "reactNext",
    issuer: "Udemy",
    image: "/images/cert-3.png",
  },
  {
    key: "cssSass",
    issuer: "Udemy",
    image: "/images/cert-4.png",
  },
  {
    key: "htmlCss",
    issuer: "Udemy",
    image: "/images/cert-5.jpg",
  },
  {
    key: "webDev",
    issuer: "Coursera",
    image: "/images/cert-6.png",
  },
  {
    key: "htmlCssJs",
    issuer: "Coursera",
    image: "/images/cert-7.png",
  },
  {
    key: "googleAi",
    issuer: "Coursera",
    image: "/images/google-ai.png",
  },
  {
    key: "claudeAi",
    issuer: "Coursera",
    image: "/images/claude-ai.png",
  },
];

const lightboxButton =
  "grid h-11 w-11 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary";

export function Certifications({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isRtl = locale === "ar";

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % certifications.length : null,
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + certifications.length) % certifications.length
        : null,
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") (isRtl ? goPrev : goNext)();
      if (e.key === "ArrowLeft") (isRtl ? goNext : goPrev)();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev, isRtl]);

  const activeTitle =
    lightboxIndex !== null
      ? dictionary.certifications.items[certifications[lightboxIndex].key]
      : "";

  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          index="04"
          eyebrow={dictionary.certifications.eyebrow}
          title={dictionary.certifications.title}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {certifications.map((cert, i) => (
            <CertCard
              key={cert.key}
              title={dictionary.certifications.items[cert.key]}
              issuer={cert.issuer}
              image={cert.image}
              index={i}
              viewLabel={dictionary.certifications.view}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${dictionary.certifications.view}: ${activeTitle}`}
        >
          <button
            onClick={closeLightbox}
            className={`absolute top-6 end-6 ${lightboxButton}`}
            aria-label={dictionary.certifications.close}
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className={`absolute start-3 md:start-8 ${lightboxButton}`}
            aria-label={dictionary.certifications.previous}
          >
            {isRtl ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          <div
            className="surface mx-16 max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl p-2 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={certifications[lightboxIndex].image}
              alt={activeTitle}
              width={1200}
              height={900}
              sizes="90vw"
              className="h-auto max-h-[70vh] w-full rounded-xl object-contain"
            />
            <div className="flex items-center justify-between gap-4 px-3 pt-4 pb-2">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {activeTitle}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {certifications[lightboxIndex].issuer}
                </p>
              </div>
              <p className="font-mono text-xs text-primary" dir="ltr">
                {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                {String(certifications.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className={`absolute end-3 md:end-8 ${lightboxButton}`}
            aria-label={dictionary.certifications.next}
          >
            {isRtl ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}

function CertCard({
  title,
  issuer,
  image,
  index,
  viewLabel,
  onClick,
}: {
  title: string;
  issuer: string;
  image: string;
  index: number;
  viewLabel: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`surface group cursor-pointer overflow-hidden rounded-2xl p-1.5 text-start transition-[opacity,translate,border-color] duration-700 ease-out hover:border-primary/35 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: `${(index % 3) * 90}ms, ${(index % 3) * 90}ms, 0ms`,
      }}
      aria-label={`${viewLabel}: ${title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          sizes="(min-width: 1152px) 368px, (min-width: 640px) calc(33vw - 24px), calc(50vw - 32px)"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2.5 end-2.5 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-foreground uppercase backdrop-blur-md">
          {issuer}
        </span>
        <span className="absolute inset-0 grid place-items-center bg-background/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <Maximize className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
      </div>
      <p className="px-2.5 pt-3.5 pb-2.5 text-xs font-semibold text-foreground sm:text-sm">
        {title}
      </p>
    </button>
  );
}
