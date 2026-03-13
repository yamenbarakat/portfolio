import { FiGithub as GithubIcon, FiMail as Mail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { href: "mailto:yamen.barakat.1994@gmail.com", icon: Mail, label: "Email" },
  {
    href: "https://github.com/yamenbarakat",
    icon: GithubIcon,
    label: "GitHub",
  },
  { href: "https://wa.me/963987319420", icon: FaWhatsapp, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {"(c) "}
          {new Date().getFullYear()}
          {" YB. All rights reserved."}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
