import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-12">
      <div className="section-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm text-primary">{siteConfig.role}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {year} {siteConfig.name}. Built with Next.js, TypeScript, and
            production engineering practices.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href={siteConfig.links.github} className="hover:text-foreground">
            GitHub
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="hover:text-foreground"
          >
            LinkedIn
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Engineering Notes
          </Link>
          <Link href="#contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
