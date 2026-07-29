"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  FiX as X,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
} from "react-icons/fi";
import { useInView } from "@/hooks/use-in-view";
import { useDictionary } from "@/components/dictionary-provider";
import type { Dictionary } from "@/get-dictionary";

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

export function Certifications() {
  const { dictionary, locale } = useDictionary();
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 });
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
    <section id="certifications" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">
            {dictionary.certifications.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {dictionary.certifications.title}
          </h2>
        </div>

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${dictionary.certifications.view}: ${activeTitle}`}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 end-6 rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-secondary/80"
            aria-label={dictionary.certifications.close}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute start-4 rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-secondary/80 md:start-8"
            aria-label={dictionary.certifications.previous}
          >
            {isRtl ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <ChevronLeft className="h-6 w-6" />
            )}
          </button>

          <div
            className="mx-16 max-h-[80vh] max-w-3xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={certifications[lightboxIndex].image}
              alt={activeTitle}
              width={1200}
              height={900}
              sizes="90vw"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
            <div className="bg-card p-4 text-center">
              <p className="text-sm font-semibold text-foreground">
                {activeTitle}
              </p>
              <p className="text-xs text-muted-foreground">
                {certifications[lightboxIndex].issuer}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute end-4 rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-secondary/80 md:end-8"
            aria-label={dictionary.certifications.next}
          >
            {isRtl ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
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
      className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-start transition-all duration-700 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      aria-label={`${viewLabel}: ${title}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          sizes="(min-width: 1152px) 352px, (min-width: 640px) calc(33vw - 24px), calc(50vw - 32px)"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-foreground sm:text-sm">
          {title}
        </p>
        <p className="text-xs text-muted-foreground">{issuer}</p>
      </div>
    </button>
  );
}
