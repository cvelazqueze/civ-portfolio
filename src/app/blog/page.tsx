import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description: "Technical writing on architecture, backend patterns, and AI engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="section-container section-padding pt-28">
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/#blog">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </Button>

      <h1 className="text-4xl font-semibold tracking-tight">Engineering Notes</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Long-form notes on systems I&apos;ve built, patterns I rely on, and
        lessons from production.
      </p>

      <div className="mt-12 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-panel block p-6 transition-colors hover:border-primary/30"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{post.category}</Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {post.date} · {post.readingTime}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
