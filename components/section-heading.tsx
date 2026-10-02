import { DotTrail } from "@/components/dot-trail";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-14 md:mb-16", className)}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
        <span className="text-primary">{index}</span>
        <DotTrail />
        <span className="text-muted-foreground">{eyebrow}</span>
      </p>
      <h2 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-foreground md:text-5xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
