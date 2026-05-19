import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/section-heading";
import { getAllPosts } from "@/lib/mdx";

export function BlogPreviewSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-padding border-t border-border/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Engineering Notes"
          title="Technical writing"
          description="Architecture decisions, backend patterns, AI engineering notes, and lessons from production debugging."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-panel group flex flex-col p-6 transition-colors hover:border-primary/30"
            >
              <Badge variant="outline" className="w-fit">
                {post.category}
              </Badge>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {post.date} · {post.readingTime}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/blog">
              All engineering notes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
