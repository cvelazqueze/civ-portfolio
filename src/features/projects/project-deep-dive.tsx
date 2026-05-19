"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { ProjectCaseStudy } from "@/types";
import { Layers } from "lucide-react";

interface ProjectDeepDiveProps {
  project: ProjectCaseStudy;
}

function DetailBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-wider text-primary">
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-primary">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectDeepDive({ project }: ProjectDeepDiveProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Layers className="h-3.5 w-3.5" />
          Deep dive
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.summary}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <Badge key={t.name} variant="outline">
              {t.name}
            </Badge>
          ))}
        </div>

        <Separator />

        <div className="grid gap-6 sm:grid-cols-2">
          <DetailBlock title="Problem" items={[project.problem]} />
          <DetailBlock title="Architecture decisions" items={project.decisions} />
          <DetailBlock title="Backend design" items={project.backendDesign} />
          <DetailBlock title="API structure" items={project.apiStructure} />
          <DetailBlock title="Database" items={project.databaseDesign} />
          <DetailBlock title="Scalability" items={project.scalability} />
          {project.authentication && (
            <DetailBlock title="Auth" items={project.authentication} />
          )}
          <DetailBlock title="Deployment" items={project.deployment} />
          {project.aiIntegrations && (
            <DetailBlock title="AI integrations" items={project.aiIntegrations} />
          )}
          <DetailBlock title="Challenges" items={project.challenges} />
          <DetailBlock title="Lessons learned" items={project.lessons} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
