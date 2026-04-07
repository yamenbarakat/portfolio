"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"

const skillCategories = [
  {
    title: "Core Technologies",
    skills: [
      { name: "HTML", color: "bg-orange-500/15 text-orange-400" },
      { name: "CSS", color: "bg-blue-500/15 text-blue-400" },
      { name: "JavaScript", color: "bg-yellow-500/15 text-yellow-400" },
      { name: "TypeScript", color: "bg-sky-500/15 text-sky-400" },
    ],
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", color: "bg-cyan-500/15 text-cyan-400" },
      { name: "Next.js", color: "bg-foreground/10 text-foreground" },
      { name: "Tailwind CSS", color: "bg-teal-500/15 text-teal-400" },
      { name: "Sass", color: "bg-pink-500/15 text-pink-400" },
      { name: "Redux", color: "bg-purple-500/15 text-purple-400" },
      { name: "React Query", color: "bg-red-500/15 text-red-400" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", color: "bg-green-500/15 text-green-400" },
      { name: "Express.js", color: "bg-foreground/10 text-foreground" },
      { name: "MongoDB", color: "bg-emerald-500/15 text-emerald-400" },
      { name: "Mongoose", color: "bg-red-500/15 text-red-400" },
      { name: "Supabase", color: "bg-emerald-500/15 text-emerald-400" },
      { name: "JWT Auth", color: "bg-amber-500/15 text-amber-400" },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", color: "bg-orange-500/15 text-orange-400" },
      { name: "GitHub", color: "bg-foreground/10 text-foreground" },
      { name: "VS Code", color: "bg-blue-500/15 text-blue-400" },
      { name: "Postman", color: "bg-orange-500/15 text-orange-400" },
      { name: "Codex", color: "bg-emerald-500/15 text-emerald-400" },
      { name: "Claude", color: "bg-amber-500/15 text-amber-400" },
      { name: "Gemini", color: "bg-indigo-500/15 text-indigo-400" },
    ],
  },
]

export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 })

  return (
    <section id="skills" className="border-t border-border bg-card/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">Technical Expertise</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Technologies I Work With
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {skillCategories.map((category, catIdx) => (
            <SkillCategory key={category.title} category={category} index={catIdx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCategory({
  category,
  index,
}: {
  category: (typeof skillCategories)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-105 ${skill.color}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
