"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useDictionary } from "@/components/dictionary-provider";
import type { Locale } from "@/i18n-config";

function LanguageToggleLink() {
  const { locale, dictionary } = useDictionary();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextLocale: Locale = locale === "en" ? "ar" : "en";
  const label =
    nextLocale === "ar"
      ? dictionary.nav.switchToArabic
      : dictionary.nav.switchToEnglish;

  const segments = pathname.split("/");
  segments[1] = nextLocale;
  const path = segments.join("/") || `/${nextLocale}`;
  const search = searchParams.toString();
  const href = `${path}${search ? `?${search}` : ""}`;

  return (
    <Link
      href={href}
      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      hrefLang={nextLocale}
      lang={nextLocale}
    >
      {label}
    </Link>
  );
}

export function LanguageToggle() {
  return (
    <Suspense
      fallback={
        <span className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground opacity-50">
          …
        </span>
      }
    >
      <LanguageToggleLink />
    </Suspense>
  );
}
