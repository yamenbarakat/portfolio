"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiExternalLink as ExternalLink } from "react-icons/fi";
import { useInView } from "@/hooks/use-in-view";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTER_PARAM = "pro";

const projects = [
  {
    title: "The Wild Oasis",
    description:
      "A responsive cabin booking web app for The Wild Oasis resort. Guests can browse luxury cabins, filter by capacity, view cabin details, and book stays. Authenticated users can manage reservations and update their guest profile.",
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
    image: "/images/the-wild-oasis.png",
    professionality: "advanced",
  },
  {
    title: "Exploring The Countries of The World",
    description:
      "An app that explores country data from the REST Countries API. Browse a full list of countries, search by name, filter by region, and open a country page to see detailed information.",
    tech: ["Next.js", "API", "CSS Modules"],
    liveUrl: "https://rest-api-countries-next-six.vercel.app/",
    image: "/images/rest-api-countries.png",
    professionality: "advanced",
  },
  {
    title: "Tour Company Landing Page",
    description:
      "A responsive tour company landing page built with HTML, CSS, and Sass. Showcases advanced CSS animations, 3D card flips, a custom navigation menu, and a popup modal — all without JavaScript.",
    tech: ["HTML", "Sass"],
    liveUrl: "https://natures-yamen.netlify.app/",
    image: "/images/natours.png",
    professionality: "intermediate",
  },
  {
    title: "React Quiz App",
    description:
      "This app tests React knowledge through 15 multiple-choice questions, tracks score in real time, includes a countdown timer, and saves key progress values in localStorage.",
    tech: ["React", "Tailwind CSS", "Vite"],
    liveUrl: "https://react-quiz-app-amber-six.vercel.app/",
    image: "/images/react-quiz-app.png",
    professionality: "intermediate",
  },
  {
    title: "Rock Paper Scissors Game",
    description:
      "An interactive Rock Paper Scissors game with score tracking. Built with React and Sass, it features clean UI, smooth interactions, and persistent score state starting at 12.",
    tech: ["React", "Sass", "Vite"],
    liveUrl: "https://rock-paper-scissors-game-three.vercel.app/",
    image: "/images/rock-paper-scissors-game.png",
    professionality: "intermediate",
  },
  {
    title: "Todo App",
    description:
      "A clean, responsive React todo app with theme switching and persistent state. Focuses on fast interactions, mobile-first layout, and simple task management.",
    tech: ["React", "Tailwind CSS", "Vite"],
    liveUrl: "https://todo-app-phi-lemon-18.vercel.app/",
    image: "/images/todo-app.png",
    professionality: "beginner",
  },
  {
    title: "Multi Steps Form",
    description:
      "A responsive, accessible multi-step subscription form built with React and Redux Toolkit. Users progress through personal info, plan selection, add-ons, and a final summary. State persists between steps and validation is handled client-side.",
    tech: [
      "React",
      "CSS Modules",
      "Redux Toolkit",
      "React Router",
      "React Hook Form",
    ],
    liveUrl: "https://multi-steps-form-with-react.vercel.app/",
    image: "/images/multisteps-form.png",
    professionality: "intermediate",
  },
  {
    title: "Type Speed Game",
    description:
      "A lightweight, browser-based typing speed game. It presents a random text prompt, tracks typing accuracy in real time, and reports your words-per-minute (WPM) when you finish.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://type-speed-game.vercel.app/",
    image: "/images/type-speed-game.png",
    professionality: "beginner",
  },
  {
    title: "Calculator App",
    description:
      "A clean browser-based calculator app supporting basic arithmetic operations. Built with vanilla JavaScript, it handles operator chaining, decimal input, and keyboard-friendly interactions.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://calculator-livid-rho-64.vercel.app/",
    image: "/images/calculator.png",
    professionality: "intermediate",
  },
  {
    title: "Showcases Landing Page",
    description:
      "A static, multi-section personal landing page featuring articles, a gallery, testimonials, team members, services, pricing plans, stats, and a contact form — all in a single-page layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://yamen-one.vercel.app/",
    image: "/images/show-app.png",
    professionality: "beginner",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

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
        <div className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-foreground">
          {project.title}
        </h3>
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
  );
}

export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilter = searchParams.get(FILTER_PARAM) ?? "all";

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

  const formatLabel = (value: string) =>
    value === "all" ? "All" : `${value[0].toUpperCase()}${value.slice(1)}`;

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
          <p className="mb-2 font-mono text-sm text-primary">Featured Work</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Some of My Projects
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Filter by Level:
          </span>
          {(["all", "beginner", "intermediate", "advanced"] as const).map(
            (level) => (
              <button
                key={level}
                type="button"
                onClick={() => setProfessionalFilter(level)}
                className={`rounded-full px-4 py-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer ${
                  selectedFilter === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/20 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {formatLabel(level)}
              </button>
            ),
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
