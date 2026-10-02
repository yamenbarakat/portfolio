import Image from "next/image";
import Link from "next/link";
import {
  FiArrowUpRight as ArrowUpRight,
  FiChevronDown as ChevronDown,
} from "react-icons/fi";
import { DotTrail } from "@/components/dot-trail";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
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

type Project = (typeof projects)[number];

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <li key={t} className="chip px-3 py-1 text-xs">
          {t}
        </li>
      ))}
    </ul>
  );
}

function BrowserFrame({
  project,
  title,
  sizes,
}: {
  project: Project;
  title: string;
  sizes: string;
}) {
  return (
    <div className="surface overflow-hidden rounded-2xl p-1.5 transition duration-500 group-hover:border-primary/30">
      <div className="flex items-center gap-3 px-3 py-2.5" dir="ltr">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        </span>
        <span className="truncate rounded-full bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {new URL(project.liveUrl).hostname}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
}

function FeaturedProject({
  project,
  index,
  title,
  description,
  category,
  viewLive,
}: {
  project: Project;
  index: number;
  title: string;
  description: string;
  category: string;
  viewLive: string;
}) {
  const isReversed = index % 2 === 1;

  return (
    <Reveal threshold={0.05} rootMargin="0px 0px 48px 0px">
      <article className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className={`block lg:col-span-7 ${isReversed ? "lg:order-2" : ""}`}
        >
          <BrowserFrame
            project={project}
            title={title}
            sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, calc(100vw - 48px)"
          />
        </a>

        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <DotTrail />
            <span className="text-muted-foreground">{category}</span>
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl text-balance">
            {title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-6">
            <TechList tech={project.tech} />
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/35 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            {viewLive}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({
  project,
  index,
  title,
  description,
  viewLive,
}: {
  project: Project;
  index: number;
  title: string;
  description: string;
  viewLive: string;
}) {
  return (
    <Reveal
      delay={(index % 3) * 70}
      threshold={0.05}
      rootMargin="0px 0px 48px 0px"
    >
      <article className="group flex h-full flex-col">
        <BrowserFrame
          project={project}
          title={title}
          sizes="(min-width: 1152px) 368px, (min-width: 640px) calc(50vw - 44px), calc(100vw - 48px)"
        />
        <div className="flex flex-1 flex-col gap-4 px-1 pt-6">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <TechList tech={project.tech} />
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
          >
            {viewLive}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>
      </article>
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

  const categoryLabel = (value: string) =>
    filterOptions.find((option) => option.value === value)?.label ?? value;

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
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="section-glow -start-40 top-40 h-96 w-96 bg-primary/[0.07]"
        aria-hidden="true"
      />
      <div className="section-shell relative">
        <SectionHeading
          index="02"
          eyebrow={dictionary.projects.eyebrow}
          title={dictionary.projects.title}
          className="mb-10 md:mb-12"
        />

        <div className="mb-16 flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            {dictionary.projects.filterLabel}
          </span>
          <nav
            aria-label={dictionary.projects.filterLabel}
            className="flex flex-wrap gap-1 rounded-3xl border border-border bg-card/60 p-1 sm:rounded-full"
          >
            {filterOptions.map((option) => {
              const isActive = selectedFilter === option.value;
              return (
                <Link
                  key={option.value}
                  href={
                    option.value === "all"
                      ? { query: {} }
                      : { query: { [FILTER_PARAM]: option.value } }
                  }
                  scroll={false}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_6px_20px_-8px_rgba(242,169,59,0.7)]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-20 md:space-y-28">
          {flagshipProjects.map((project, i) => {
            const item = dictionary.projects.items[project.key];
            return (
              <FeaturedProject
                key={project.key}
                project={project}
                index={i}
                title={item.title}
                description={item.description}
                category={categoryLabel(project.professionality)}
                viewLive={dictionary.projects.viewLive}
              />
            );
          })}
        </div>

        {experimentProjects.length > 0 && (
          <details
            className={`group/details ${flagshipProjects.length > 0 ? "mt-20 md:mt-28" : ""}`}
            open={flagshipProjects.length === 0 ? true : undefined}
          >
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary [&::-webkit-details-marker]:hidden">
              {dictionary.projects.otherExperiments}
              <span className="font-mono text-xs text-muted-foreground">
                {String(experimentProjects.length).padStart(2, "0")}
              </span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open/details:rotate-180" />
            </summary>

            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
