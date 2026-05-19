import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects, getProjectBySlug } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

function Section({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-mono text-sm uppercase tracking-wider text-primary">
        {title}
      </h2>
      <ul className="space-y-2 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm">
            <span className="text-primary">→</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="section-container section-padding pt-28">
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/#projects">
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </Button>

      <div className="flex flex-wrap gap-2">
        <Badge>{project.complexity}</Badge>
        <Badge variant="outline">{project.category}</Badge>
      </div>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {project.summary}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        <strong className="text-foreground">Role:</strong> {project.role}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <Badge key={t.name} variant="secondary">
            {t.name}
          </Badge>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {project.liveUrl && (
          <Button asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live demo <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              Source
            </Link>
          </Button>
        )}
      </div>

      <Separator className="my-12" />

      <div className="grid gap-10 md:grid-cols-2">
        <Section title="Problem" items={[project.problem]} />
        <Section title="Architecture decisions" items={project.decisions} />
        <Section title="Backend design" items={project.backendDesign} />
        <Section title="API structure" items={project.apiStructure} />
        <Section title="Database design" items={project.databaseDesign} />
        <Section title="Scalability" items={project.scalability} />
        {project.authentication && (
          <Section title="Authentication" items={project.authentication} />
        )}
        <Section title="Deployment" items={project.deployment} />
        {project.aiIntegrations && (
          <Section title="AI integrations" items={project.aiIntegrations} />
        )}
        <Section title="Challenges" items={project.challenges} />
        <Section title="Lessons learned" items={project.lessons} />
      </div>
    </article>
  );
}
