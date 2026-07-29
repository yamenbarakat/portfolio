"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";

export function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  rootMargin,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold, rootMargin });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
