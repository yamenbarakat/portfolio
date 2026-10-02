import { FiGithub as GithubIcon, FiMail as Mail, FiArrowUp as ArrowUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { Dictionary } from "@/get-dictionary";

const socialLinks = [
  { href: "mailto:yamen.barakat.1994@gmail.com", icon: Mail, label: "Email" },
  { href: "https://github.com/yamenbarakat", icon: GithubIcon, label: "GitHub" },
  { href: "https://wa.me/963987319420", icon: FaWhatsapp, label: "WhatsApp" },
];

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="border-t border-white/10 bg-[#06070a] py-8">
      <div className="section-shell flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/25 bg-primary/8 font-mono text-xs font-bold text-primary">YB</span>
          <p className="text-sm text-white/36">© {new Date().getFullYear()} {dictionary.footer.rights}</p>
        </div>
        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("mailto") ? undefined : "_blank"} rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"} className="grid h-9 w-9 place-items-center rounded-full border border-white/9 text-white/42 transition hover:border-primary/30 hover:text-primary" aria-label={link.label}>
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <a href="#hero" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#090a0e] transition hover:-translate-y-1" aria-label="Back to top"><ArrowUp className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}
