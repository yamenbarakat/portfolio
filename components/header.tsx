"use client";

import { useState, useEffect } from "react";
import { FiMenu as Menu, FiX as X } from "react-icons/fi";
import { LanguageToggle } from "@/components/language-toggle";
import type { Dictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";

export function Header({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  const navLinks = [
    { label: dictionary.nav.services, href: "#services" },
    { label: dictionary.nav.projects, href: "#projects" },
    { label: dictionary.nav.skills, href: "#skills" },
    { label: dictionary.nav.certifications, href: "#certifications" },
    { label: dictionary.nav.about, href: "#about" },
    { label: dictionary.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the nav link of the section crossing the middle of the viewport
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(
              entry.target.id === "hero" ? "" : `#${entry.target.id}`,
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 ps-4 pe-2 transition-all duration-500 ${
          isSolid
            ? "border-border bg-background/75 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#hero"
          className="group flex items-center gap-2.5"
          aria-label="Yamen Barakat"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            YB
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/50 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors lg:px-4 ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute start-1/2 -bottom-px h-px w-4 -translate-x-1/2 bg-primary transition-opacity rtl:translate-x-1/2 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle dictionary={dictionary} locale={locale} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/60 text-foreground md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMobileMenuOpen
                ? dictionary.nav.closeMenu
                : dictionary.nav.openMenu
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="surface mx-auto mt-2 max-w-6xl rounded-3xl bg-background/95 p-3 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300 md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-secondary ${
                    activeHref === link.href
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
