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

  const navLinks = [
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-xl font-bold tracking-tight text-primary transition-colors hover:text-primary/80 lg:text-2xl"
        >
          YB
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle dictionary={dictionary} locale={locale} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle dictionary={dictionary} locale={locale} />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
            aria-label={
              isMobileMenuOpen
                ? dictionary.nav.closeMenu
                : dictionary.nav.openMenu
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
