import type { ProjectCaseStudy } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  project: ProjectCaseStudy;
  className?: string;
}

export function ProjectPreview({ project, className }: ProjectPreviewProps) {
  switch (project.slug) {
    case "bookamenities":
      return <BookamenitiesPreview className={className} />;
    case "simple-react-tutorial":
      return <SimpleReactPreview className={className} />;
    case "portfolio-platform":
      return <PortfolioPreview className={className} />;
    default:
      return <DefaultPreview project={project} className={className} />;
  }
}

function DefaultPreview({
  project,
  className,
}: {
  project: ProjectCaseStudy;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-center gap-3 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-6",
        className
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
        {project.category}
      </p>
      <p className="max-w-[240px] text-sm font-medium text-foreground/90 line-clamp-2">
        {project.title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((t) => (
          <span
            key={t.name}
            className="rounded border border-border/50 bg-muted/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground"
          >
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function BookamenitiesPreview({ className }: { className?: string }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const booked = new Set([2, 5, 9, 12]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-3 bg-gradient-to-br from-primary/8 via-card to-background p-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-primary">bookamenities.com</span>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary">
          Scheduler
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <span
            key={d}
            className="text-center font-mono text-[8px] text-muted-foreground"
          >
            {d}
          </span>
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-sm border",
              booked.has(i)
                ? "border-primary/50 bg-primary/20"
                : "border-border/40 bg-muted/20"
            )}
          />
        ))}
      </div>
      <p className="font-mono text-[9px] text-muted-foreground">
        Whole-day · multi-amenity · conflict-safe
      </p>
    </div>
  );
}

function SimpleReactPreview({ className }: { className?: string }) {
  const topics = ["Componentes", "Estado", "Eventos", "APIs", "Hooks"];

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-center gap-3 bg-[#f4f4f5] p-5 text-[#27272a]",
        className
      )}
    >
      <p className="text-center text-sm font-bold leading-tight">
        Simple React
        <span className="block text-xs font-semibold text-[#52525b]">
          Tutorial interactivo
        </span>
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {topics.map((topic, i) => (
          <span
            key={topic}
            className={cn(
              "rounded-md px-2 py-1 text-[9px] font-semibold text-white",
              i === 0 ? "bg-[#2563eb] ring-2 ring-[#93c5fd]" : "bg-[#3b82f6]"
            )}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

function PortfolioPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-center gap-2 bg-gradient-to-br from-background via-card to-primary/10 p-4 font-mono text-[10px]",
        className
      )}
    >
      <p className="text-primary">$ npx next dev</p>
      <p className="text-muted-foreground">▸ API playground ready</p>
      <p className="text-muted-foreground">▸ ⌘K command palette</p>
      <p className="text-muted-foreground">▸ MDX engineering notes</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-accent" />
      </div>
    </div>
  );
}
