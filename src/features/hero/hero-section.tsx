"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { siteConfig } from "@/lib/site";
import { TerminalWindow } from "./terminal-window";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-24 pb-16 md:pt-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 grid-bg opacity-40"
        aria-hidden
      />
      <motion.div className="section-container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Available for full-stack & backend roles
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Full Stack Engineer
              <span className="mt-2 block text-gradient">
                Backend depth. Modern UI. AI-native.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              I&apos;m <strong className="text-foreground">{siteConfig.name}</strong>
              — I design and ship production systems: scalable APIs, thoughtful data
              models, and interfaces that feel like real products. Growing frontend
              craft with the same rigor I bring to backend architecture.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg">
                <a href="#projects">
                  View case studies
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Get in touch</a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.dl
              variants={fadeUp}
              custom={4}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-border/60 pt-8"
            >
              {[
                { label: "Focus", value: "Backend & APIs" },
                { label: "Stack", value: "TS · Node · PG" },
                { label: "Edge", value: "AI workflows" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-xs text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{stat.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div variants={fadeUp} custom={2}>
            <TerminalWindow />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
