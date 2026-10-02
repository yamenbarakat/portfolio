import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/get-dictionary";

type CategoryKey = keyof Dictionary["skills"]["categories"];

const skillCategories: { key: CategoryKey; skills: string[] }[] = [
  {
    key: "core",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    key: "frontend",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Sass",
      "Redux",
      "React Query",
    ],
  },
  {
    key: "backend",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Supabase",
      "JWT Auth",
    ],
  },
  {
    key: "tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Codex",
      "Claude",
      "Gemini",
    ],
  },
];

export function Skills({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          index="03"
          eyebrow={dictionary.skills.eyebrow}
          title={dictionary.skills.title}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Reveal key={category.key} delay={index * 90}>
              <div className="surface group h-full rounded-2xl p-7 transition-colors duration-500 hover:border-primary/25 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
                    {dictionary.skills.categories[category.key]}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(skillCategories.length).padStart(2, "0")}
                  </span>
                </div>
                <div
                  className="my-6 h-px bg-gradient-to-r from-primary/40 via-border to-transparent rtl:bg-gradient-to-l"
                  aria-hidden="true"
                />
                <ul className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <li key={skill} className="chip">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-primary/70"
                        aria-hidden="true"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
