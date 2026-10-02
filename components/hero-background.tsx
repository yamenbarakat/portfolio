"use client";

import { useEffect, useRef } from "react";

const AMBER = "242, 169, 59";
const SPOTLIGHT_RADIUS = 180;

/**
 * Dot-matrix field: slow interfering waves drift warm "heat shimmer" bands
 * across the grid, and a soft spotlight follows the pointer.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let width = 0;
    let height = 0;
    let gap = 28;
    let animationId = 0;
    let isInView = true;
    const pointer = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

    const draw = (time: number) => {
      const t = time * 0.00018;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgb(${AMBER})`;

      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      const offsetX = (width % gap) / 2;
      const offsetY = (height % gap) / 2;

      for (let x = offsetX; x <= width; x += gap) {
        for (let y = offsetY; y <= height; y += gap) {
          const wave =
            Math.sin(x * 0.008 + t * 3) +
            Math.sin(y * 0.011 - t * 2.2) +
            Math.sin((x + y) * 0.005 + t * 1.4);
          const band = Math.pow((wave + 3) / 6, 3);

          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const spot =
            distance < SPOTLIGHT_RADIUS ? 1 - distance / SPOTLIGHT_RADIUS : 0;

          const alpha = 0.09 + band * 0.55 + spot * 0.55;
          const size = 0.7 + band * 1.1 + spot * 1.3;

          ctx.globalAlpha = Math.min(alpha, 0.9);
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      animationId = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(animationId);
      animationId = 0;
    };

    const start = () => {
      if (
        animationId ||
        reducedMotion.matches ||
        !isInView ||
        document.hidden
      ) {
        return;
      }
      animationId = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = width < 768 ? 34 : 28;
      if (!animationId) draw(performance.now());
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.targetX = -9999;
      pointer.targetY = -9999;
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        draw(0);
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionChange);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-field absolute inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
