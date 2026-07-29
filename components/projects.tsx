"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiExternalLink as ExternalLink } from "react-icons/fi";
import { useInView } from "@/hooks/use-in-view";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDictionary } from "@/components/dictionary-provider";
import type { Dictionary } from "@/get-dictionary";

const FILTER_PARAM = "pro";

type ProjectKey = keyof Dictionary["projects"]["items"];

const projects: {
  key: ProjectKey;
  tech: string[];
  liveUrl: string;
  image: string;
  professionality: string;
}[] = [
  {
    key: "alyasmin",
    tech: [
      "Next.js",
      "React.js",
      "Supabase",
      "Tailwind CSS",
      "NextAuth",
      "TypeScript",
      "lucide-react",
      "next-intl",
    ],
    liveUrl: "https://alyasmin-restaurant.vercel.app/en",
    image: "/images/alyasmin-restaurant.png",
    professionality: "Full Stack",
  },
  {
    key: "hotel",
    tech: [
      "Next.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "NextAuth",
      "React Day Picker",
      "date-fns",
    ],
    liveUrl: "https://the-wild-oasis-inky-ten.vercel.app/",
    image: "/images/hotel.png",
    professionality: "Full Stack",
  },
  {
    key: "dashboard",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Recharts"],
    liveUrl: "https://restaurant-management-dashboard-phi.vercel.app/dashboard",
    image: "/images/dashboard.png",
    professionality: "Full Stack",
  },
  {
    key: "countries",
    tech: ["Next.js", "API", "CSS Modules"],
    liveUrl: "https://rest-api-countries-next-six.vercel.app/",
    image: "/images/rest-api-countries.png",
    professionality: "Next.js",
  },
  {
    key: "natours",
    tech: ["HTML", "Sass"],
    liveUrl: "https://natures-yamen.netlify.app/",
    image: "/images/natours.png",
    professionality: "Core Technologies",
  },
  {
    key: "quiz",
    tech: ["React", "Tailwind CSS", "Vite"],
    liveUrl: "https://react-quiz-app-amber-six.vercel.app/",
    image: "/images/react-quiz-app.png",
    professionality: "React.js",
  },
  {
    key: "rps",
    tech: ["React", "Sass", "Vite"],
    liveUrl: "https://rock-paper-scissors-game-three.vercel.app/",
    image: "/images/rock-paper-scissors-game.png",
    professionality: "React.js",
  },
  {
    key: "todo",
    tech: ["React", "Tailwind CSS", "Vite"],
    liveUrl: "https://todo-app-phi-lemon-18.vercel.app/",
    image: "/images/todo-app.png",
    professionality: "React.js",
  },
  {
    key: "multistep",
    tech: [
      "React",
      "CSS Modules",
      "Redux Toolkit",
      "React Router",
      "React Hook Form",
    ],
    liveUrl: "https://multi-steps-form-with-react.vercel.app/",
    image: "/images/multisteps-form.png",
    professionality: "React.js",
  },
  {
    key: "typeSpeed",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://type-speed-game.vercel.app/",
    image: "/images/type-speed-game.png",
    professionality: "Core Technologies",
  },
  {
    key: "calculator",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://calculator-livid-rho-64.vercel.app/",
    image: "/images/calculator.png",
    professionality: "Core Technologies",
  },
];

function ProjectCard({
  project,
  index,
  title,
  description,
  viewLive,
}: {
  project: (typeof projects)[0];
  index: number;
  title: string;
  description: string;
  viewLive: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    threshold: 0.05,
    rootMargin: "0px 0px 48px 0px",
  });

  return (
    <div
      ref={ref}
      className={`group overflow-hidden rounded-xl border border-border bg-card transition-all duration-700 ease-out hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
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
          {viewLive}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const { dictionary } = useDictionary();
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    threshold: 0.05,
    rootMargin: "0px 0px 24px 0px",
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterOptions = [
    { value: "all", label: dictionary.projects.filters.all },
    { value: "Full Stack", label: dictionary.projects.filters.fullStack },
    { value: "Next.js", label: dictionary.projects.filters.nextjs },
    { value: "React.js", label: dictionary.projects.filters.reactjs },
    { value: "Core Technologies", label: dictionary.projects.filters.core },
  ] as const;

  const rawFilter = searchParams.get(FILTER_PARAM) ?? "all";
  const selectedFilter = filterOptions.some(
    (option) => option.value === rawFilter,
  )
    ? rawFilter
    : "all";

  const filteredProjects = projects.filter((project) =>
    selectedFilter === "all"
      ? true
      : project.professionality === selectedFilter,
  );

  const setProfessionalFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(FILTER_PARAM);
    } else {
      params.set(FILTER_PARAM, value);
    }

    const search = params.toString();
    router.replace(`${pathname}${search ? `?${search}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${
            isHeadingInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-2 font-mono text-sm text-primary">
            {dictionary.projects.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {dictionary.projects.title}
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {dictionary.projects.filterLabel}
          </span>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setProfessionalFilter(option.value)}
              className={`rounded-full px-4 py-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${
                selectedFilter === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/20 text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {filteredProjects.map((project, i) => {
            const item = dictionary.projects.items[project.key];
            return (
              <ProjectCard
                key={project.key}
                project={project}
                index={i}
                title={item.title}
                description={item.description}
                viewLive={dictionary.projects.viewLive}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
