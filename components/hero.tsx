"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiArrowDown as ArrowDown } from "react-icons/fi";
import { useDictionary } from "@/components/dictionary-provider";

export function Hero() {
  const { dictionary } = useDictionary();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 206, 190, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(94, 206, 190, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-4 px-6 py-28 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <div
          className={`w-full flex-1 text-center transition-all duration-1000 ease-out md:text-start ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
            {dictionary.hero.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
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

        <div
          className={`relative hidden w-[min(515px,100%)] shrink-0 transition-all duration-1000 ease-out delay-200 md:block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Image
            src="/images/photo_transparent.png"
            alt={dictionary.about.imageAlt}
            width={515}
            height={800}
            priority
            className="h-auto max-h-[min(800px,70vh)] w-full max-w-[515px] object-contain drop-shadow-2xl"
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
