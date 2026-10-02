import type { IconType } from "react-icons";
import {
  FiArrowUpRight as ArrowUpRight,
  FiGithub as GithubIcon,
  FiMail as Mail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/get-dictionary";

const contactLinks: {
  href: string;
  label: string;
  value: string;
  icon: IconType;
}[] = [
  {
    href: "mailto:yamen.barakat.1994@gmail.com",
    label: "Email",
    value: "yamen.barakat.1994@gmail.com",
    icon: Mail,
  },
  {
    href: "https://github.com/yamenbarakat",
    label: "GitHub",
    value: "github.com/yamenbarakat",
    icon: GithubIcon,
  },
  {
    href: "https://wa.me/963987319420",
    label: "WhatsApp",
    value: "+963987319420",
    icon: FaWhatsapp,
  },
];

export function Contact({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="contact-bottom-light" aria-hidden="true" />
      <div className="section-shell relative">
        <SectionHeading
          index="06"
          eyebrow={dictionary.contact.eyebrow}
          title={dictionary.contact.title}
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
                {dictionary.contact.connect}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                {dictionary.contact.connectText}
              </p>
            </div>

            <ul className="space-y-3">
              {contactLinks.map((link) => {
                const isExternal = !link.href.startsWith("mailto");
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="surface group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors duration-300 hover:border-primary/40 sm:px-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <link.icon
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                          {link.label}
                        </span>
                        <span
                          className="mt-0.5 block truncate text-sm font-medium text-foreground sm:text-[15px]"
                          dir="ltr"
                        >
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="surface rounded-[1.75rem] p-6 sm:p-8">
              <ContactForm copy={dictionary.contact} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
