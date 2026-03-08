"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

export function useInView(ref: React.RefObject<HTMLElement | null>, options: UseInViewOptions = {}) {
  const [isInView, setIsInView] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true)
          hasAnimated.current = true
          observer.unobserve(element)
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -80px 0px",
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return isInView
}
