"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Dictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";

function LanguageToggleLink({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
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
      className="inline-flex h-9 items-center rounded-full border border-border bg-card/60 px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      hrefLang={nextLocale}
      lang={nextLocale}
    >
      {label}
    </Link>
  );
}

export function LanguageToggle({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <Suspense
      fallback={
        <span className="inline-flex h-9 items-center rounded-full border border-border bg-card/60 px-4 text-sm font-medium text-muted-foreground opacity-50">
          …
        </span>
      }
    >
      <LanguageToggleLink locale={locale} dictionary={dictionary} />
    </Suspense>
  );
}
