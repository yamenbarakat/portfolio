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
    <section
      id="services"
      className="border-t border-border bg-card/50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-2 font-mono text-sm text-primary">
            {dictionary.services.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {dictionary.services.title}
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {dictionary.services.description}
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const item = dictionary.services.items[service.key];
            const Icon = service.icon;

            return (
              <Reveal key={service.key} delay={index * 70}>
                <article className="group h-full rounded-xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
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
