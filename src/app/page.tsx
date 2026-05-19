import { AIShowcaseSection } from "@/features/ai-showcase/ai-showcase-section";
import { BackendShowcaseSection } from "@/features/backend-showcase/backend-showcase-section";
import { BlogPreviewSection } from "@/features/blog/blog-preview-section";
import { ContactSection } from "@/features/contact/contact-section";
import { GitHubSection } from "@/features/github/github-section";
import { HeroSection } from "@/features/hero/hero-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { SkillsSection } from "@/features/skills/skills-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <BackendShowcaseSection />
      <AIShowcaseSection />
      <GitHubSection />
      <BlogPreviewSection />
      <ContactSection />
    </>
  );
}
