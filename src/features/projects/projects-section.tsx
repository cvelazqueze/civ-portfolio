"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { ProjectPreview } from "@/features/projects/project-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectDeepDive } from "@/features/projects/project-deep-dive";
import { featuredProjects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/animations";
const complexityColors = {
  production: "accent",
  high: "default",
  medium: "secondary",
} as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Case Studies"
          title="Production systems, not side projects"
          description="Each project is documented like an engineering product: architecture, trade-offs, and lessons from shipping real software."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              variants={fadeUp}
              custom={index}
              className="group glass-panel overflow-hidden transition-colors hover:border-primary/30"
            >
              <div className="relative aspect-video overflow-hidden border-b border-border/40 bg-muted/20">
                <ProjectPreview project={project} className="min-h-full" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={complexityColors[project.complexity]}>
                    {project.complexity}
                  </Badge>
                  <Badge variant="outline">{project.category}</Badge>
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {project.summary}
                </p>

                <ul className="mt-4 space-y-1">
                  {project.architecture.slice(0, 2).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  <span className="text-foreground/80">Role:</span> {project.role}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <ProjectDeepDive project={project} />
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/projects/${project.slug}`}>Full case study</Link>
                  </Button>
                  {project.liveUrl && (
                    <Button asChild variant="ghost" size="sm">
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
