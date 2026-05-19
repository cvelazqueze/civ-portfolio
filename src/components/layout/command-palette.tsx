"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { featuredProjects } from "@/data/projects";
import { navSections, siteConfig } from "@/lib/site";
import { useCommandStore } from "@/stores/command-store";
import {
  BookOpen,
  ExternalLink,
  FolderGit2,
  Mail,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const { open, setOpen } = useCommandStore();

  const run = useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    [setOpen]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search projects, sections, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {navSections.map((section) => (
            <CommandItem
              key={section.id}
              value={section.label}
              onSelect={() =>
                run(() => {
                  if (section.id === "blog") router.push("/blog");
                  else
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                })
              }
            >
              <Terminal className="h-4 w-4 text-primary" />
              {section.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {featuredProjects.map((project) => (
            <CommandItem
              key={project.slug}
              value={project.title}
              onSelect={() =>
                run(() => router.push(`/projects/${project.slug}`))
              }
            >
              <FolderGit2 className="h-4 w-4" />
              {project.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              run(() =>
                document.getElementById("backend")?.scrollIntoView({
                  behavior: "smooth",
                })
              )
            }
          >
            <Server className="h-4 w-4" />
            Open API Playground
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() =>
                document.getElementById("ai")?.scrollIntoView({
                  behavior: "smooth",
                })
              )
            }
          >
            <Sparkles className="h-4 w-4" />
            AI Engineering Showcase
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/blog"))}>
            <BookOpen className="h-4 w-4" />
            Engineering Notes
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              )
            }
          >
            <Mail className="h-4 w-4" />
            Contact
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => window.open(siteConfig.links.github, "_blank"))}
          >
            <ExternalLink className="h-4 w-4" />
            GitHub Profile
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
