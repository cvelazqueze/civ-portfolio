"use client";

import { motion } from "framer-motion";
import { Cloud, Layout, Server, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { levelLabels, skillCategories } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const icons = {
  server: Server,
  layout: Layout,
  sparkles: Sparkles,
  cloud: Cloud,
} as const;

const levelIntensity = {
  expert: "w-full",
  advanced: "w-4/5",
  proficient: "w-3/5",
  growing: "w-2/5",
} as const;

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Engineering Stack"
          title="Depth across the full stack"
          description="Skills represented by production readiness—not percentage bars. Each category reflects how I ship and operate real systems."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {skillCategories.map((category, catIndex) => {
            const Icon = icons[category.icon as keyof typeof icons] ?? Server;
            return (
              <motion.div
                key={category.id}
                variants={fadeUp}
                custom={catIndex}
                className="glass-panel p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {category.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {levelLabels[skill.level]}
                        </span>
                      </div>
                      {skill.note && (
                        <p className="mt-0.5 text-xs text-muted-foreground/80">
                          {skill.note}
                        </p>
                      )}
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r from-primary/80 to-accent/80",
                            levelIntensity[skill.level]
                          )}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
