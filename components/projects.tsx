"use client"

import { useRef } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with product management, cart functionality, and secure checkout. Built with a focus on performance and seamless user experience.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    liveUrl: "https://example.com",
    image: "/images/project-1.jpg",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative project management tool with real-time updates, drag-and-drop boards, and team workspaces for streamlined productivity.",
    tech: ["React", "Node.js", "Express", "Socket.io"],
    liveUrl: "https://example.com",
    image: "/images/project-2.jpg",
  },
  {
    title: "Social Media Dashboard",
    description:
      "An analytics dashboard aggregating data from multiple social platforms, featuring interactive charts and automated reporting.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com",
    image: "/images/project-3.jpg",
  },
  {
    title: "AI Content Generator",
    description:
      "A smart writing assistant powered by machine learning that helps create blog posts, social captions, and marketing copy with ease.",
    tech: ["React", "Python", "FastAPI", "OpenAI"],
    liveUrl: "https://example.com",
    image: "/images/project-4.jpg",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`group overflow-hidden rounded-xl border border-border bg-card transition-all duration-700 ease-out hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View Live
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}

export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 })

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">Featured Work</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Some of My Projects
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
