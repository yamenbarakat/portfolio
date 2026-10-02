import {
  FiArrowUp as ArrowUp,
  FiGithub as GithubIcon,
  FiMail as Mail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { Dictionary } from "@/get-dictionary";

const socialLinks = [
  { href: "mailto:yamen.barakat.1994@gmail.com", icon: Mail, label: "Email" },
  {
    href: "https://github.com/yamenbarakat",
    icon: GithubIcon,
    label: "GitHub",
  },
  { href: "https://wa.me/963987319420", icon: FaWhatsapp, label: "WhatsApp" },
];

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden="true"
      />
      <div className="section-shell relative pt-12 pb-8">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary">
              YB
            </span>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {dictionary.footer.rights}
            </p>
          </div>
          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const isExternal = !link.href.startsWith("mailto");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    aria-label={link.label}
                  >
                    <link.icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
            <a
              href="#hero"
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:-translate-y-1"
              aria-label={dictionary.footer.backToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p
          className="footer-wordmark mt-10 text-center font-semibold leading-[0.8] tracking-[-0.06em] select-none text-[clamp(6rem,22vw,16rem)]"
          aria-hidden="true"
        >
          YB
        </p>
      </div>
    </footer>
  );
}
