import Image from "next/image";
import Link from "next/link";
import {
  FiChevronDown as ChevronDown,
  FiExternalLink as ExternalLink,
} from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/get-dictionary";

const FILTER_PARAM = "pro";

const flagshipProjectKeys = new Set<ProjectKey>([
  "alyasmin",
  "hotel",
  "dashboard",
  "countries",
]);

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
  return (
    <Reveal
      className="group overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
      delay={index * 60}
      threshold={0.05}
      rootMargin="0px 0px 48px 0px"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(min-width: 1152px) 544px, (min-width: 640px) calc(50vw - 44px), calc(100vw - 48px)"
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
    </Reveal>
  );
}

export function Projects({
  dictionary,
  selectedFilter: requestedFilter,
}: {
  dictionary: Dictionary;
  selectedFilter: string;
}) {
  const filterOptions = [
    { value: "all", label: dictionary.projects.filters.all },
    { value: "Full Stack", label: dictionary.projects.filters.fullStack },
    { value: "Next.js", label: dictionary.projects.filters.nextjs },
    { value: "React.js", label: dictionary.projects.filters.reactjs },
    { value: "Core Technologies", label: dictionary.projects.filters.core },
  ] as const;

  const selectedFilter = filterOptions.some(
    (option) => option.value === requestedFilter,
  )
    ? requestedFilter
    : "all";

  const filteredProjects = projects.filter((project) =>
    selectedFilter === "all"
      ? true
      : project.professionality === selectedFilter,
  );
  const flagshipProjects = filteredProjects.filter((project) =>
    flagshipProjectKeys.has(project.key),
  );
  const experimentProjects = filteredProjects.filter(
    (project) => !flagshipProjectKeys.has(project.key),
  );

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          className="mb-16"
          threshold={0.05}
          rootMargin="0px 0px 24px 0px"
        >
          <p className="mb-2 font-mono text-sm text-primary">
            {dictionary.projects.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {dictionary.projects.title}
          </h2>
        </Reveal>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {dictionary.projects.filterLabel}
          </span>
          {filterOptions.map((option) => (
            <Link
              key={option.value}
              href={
                option.value === "all"
                  ? { query: {} }
                  : { query: { [FILTER_PARAM]: option.value } }
              }
              scroll={false}
              className={`rounded-full px-4 py-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${
                selectedFilter === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/20 text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {flagshipProjects.map((project, i) => {
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

        {experimentProjects.length > 0 && (
          <details className="group mt-12">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
              {dictionary.projects.otherExperiments}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {experimentProjects.map((project, i) => {
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
          </details>
        )}
      </div>
    </section>
  );
}
