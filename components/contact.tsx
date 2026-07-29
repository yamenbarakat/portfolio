import {
  FiMail as Mail,
  FiGithub as GithubIcon,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/get-dictionary";

export function Contact({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <p className="mb-2 font-mono text-sm text-primary">
            {dictionary.contact.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            {dictionary.contact.title}
          </h2>
        </Reveal>

        <Reveal className="flex flex-col gap-12 md:flex-row md:gap-16">
          <ContactForm copy={dictionary.contact} />

          <div className="flex flex-col justify-center gap-8 md:w-80">
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                {dictionary.contact.connect}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {dictionary.contact.connectText}
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="mailto:yamen.barakat.1994@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                yamen.barakat.1994@gmail.com
              </a>
              <a
                href="https://github.com/yamenbarakat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <GithubIcon className="h-4 w-4 text-primary" />
                </div>
                github.com/yamenbarakat
              </a>
              <a
                href="https://wa.me/963987319420"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <FaWhatsapp className="h-4 w-4 text-primary" />
                </div>
                +963987319420
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
