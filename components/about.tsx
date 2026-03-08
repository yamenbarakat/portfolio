"use client"

import { useRef } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

export function About() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 })
  const contentRef = useRef<HTMLDivElement>(null)
  const isContentInView = useInView(contentRef, { threshold: 0.1 })

  return (
    <section id="about" className="border-t border-border bg-card/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">Get to Know Me</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            About Me
          </h2>
        </div>

        <div
          ref={contentRef}
          className={`flex flex-col items-center gap-12 md:flex-row md:gap-16 transition-all duration-700 ease-out ${
            isContentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-5">
            <p className="leading-relaxed text-muted-foreground">
              Hello! I&apos;m <span className="font-semibold text-foreground">Yamen Barakat</span>, a passionate Full Stack Developer with a strong
              foundation in modern web technologies. I love crafting clean,
              efficient, and user-friendly applications that solve real-world
              problems. My journey in development started with a curiosity for
              how things work on the web, and it has since evolved into a
              full-blown career.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              I specialize in building end-to-end web applications using the
              MERN stack and Next.js. From designing responsive frontends with
              React and Tailwind CSS to architecting robust backends with
              Node.js and MongoDB, I enjoy every step of the development
              process.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open-source projects, or writing
              about development best practices. I believe in continuous
              learning and strive to stay ahead in this ever-evolving field.
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="h-72 w-72 overflow-hidden rounded-2xl border-2 border-border md:h-80 md:w-80">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile photo"
                  fill
                  sizes="(min-width: 768px) 20rem, 18rem"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 h-72 w-72 rounded-2xl border-2 border-primary/20 md:h-80 md:w-80" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
