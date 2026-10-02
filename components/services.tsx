import type { IconType } from "react-icons";
import {
  FiBarChart2 as BarChart,
  FiCalendar as Calendar,
  FiGlobe as Globe,
  FiMonitor as Monitor,
  FiShoppingCart as ShoppingCart,
  FiTool as Tool,
} from "react-icons/fi";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/get-dictionary";

type ServiceKey = keyof Dictionary["services"]["items"];

const services: { key: ServiceKey; icon: IconType }[] = [
  { key: "businessWebsites", icon: Monitor },
  { key: "orderingSystems", icon: ShoppingCart },
  { key: "bookingPlatforms", icon: Calendar },
  { key: "adminDashboards", icon: BarChart },
  { key: "multilingualApps", icon: Globe },
  { key: "improvements", icon: Tool },
];

export function Services({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          index="01"
          eyebrow={dictionary.services.eyebrow}
          title={dictionary.services.title}
          description={dictionary.services.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const item = dictionary.services.items[service.key];
            const Icon = service.icon;

            return (
              <Reveal key={service.key} delay={index * 70}>
                <article className="surface group relative h-full overflow-hidden rounded-2xl p-7 transition duration-500 hover:-translate-y-1 hover:border-primary/30">
                  <span
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary via-ember to-transparent transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right rtl:bg-gradient-to-l"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute -top-24 -end-24 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-8 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
