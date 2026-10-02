import { cn } from "@/lib/utils";

/** Three fading dots used as a small lead-in marker before labels. */
export function DotTrail({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center gap-1", className)}
      aria-hidden="true"
    >
      <span className="h-[5px] w-[5px] rounded-full bg-primary/30" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/55" />
      <span className="h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}
