"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  FiX as X,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
} from "react-icons/fi";
import { useInView } from "@/hooks/use-in-view";

const certifications = [
  {
    title: "Front End Developer Nano Degree",
    issuer: "Udacity",
    image: "/images/cert-1.png",
  },
  {
    title: "Java Script Nano Degree",
    issuer: "Udacity",
    image: "/images/cert-2.png",
  },
  {
    title: "React.js & Next.js",
    issuer: "Udemy",
    image: "/images/cert-3.png",
  },
  {
    title: "Advanced Css & Sass",
    issuer: "Udemy",
    image: "/images/cert-4.png",
  },
  {
    title: "Html & Css",
    issuer: "Udemy",
    image: "/images/cert-5.jpg",
  },
  {
    title: "Web Development",
    issuer: "Coursera",
    image: "/images/cert-6.png",
  },
  {
    title: "Html, Css & Java Script",
    issuer: "Coursera",
    image: "/images/cert-7.png",
  },
];

export function Certifications() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">Credentials</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            My Certifications
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
          {certifications.map((cert, i) => (
            <CertCard
              key={cert.title}
              cert={cert}
              index={i}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${certifications[lightboxIndex].title}`}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-secondary/80"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-secondary/80 md:left-8"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="mx-16 max-h-[80vh] max-w-3xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={certifications[lightboxIndex].image}
              alt={certifications[lightboxIndex].title}
              width={1200}
              height={900}
              sizes="90vw"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
            <div className="bg-card p-4 text-center">
              <p className="text-sm font-semibold text-foreground">
                {certifications[lightboxIndex].title}
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
            className="absolute right-4 rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-secondary/80 md:right-8"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}

function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: (typeof certifications)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-700 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      aria-label={`View certificate: ${cert.title}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={cert.image}
          alt={cert.title}
          width={800}
          height={600}
          sizes="(min-width: 768px) 33vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-foreground sm:text-sm">
          {cert.title}
        </p>
        <p className="text-xs text-muted-foreground">{cert.issuer}</p>
      </div>
    </button>
  );
}
