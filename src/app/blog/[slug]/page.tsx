import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="section-container section-padding pt-28 max-w-3xl">
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4" />
          All notes
        </Link>
      </Button>

      <Badge variant="outline">{post.meta.category}</Badge>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {post.meta.title}
      </h1>
      <p className="mt-4 text-muted-foreground">{post.meta.description}</p>
      <p className="mt-2 font-mono text-xs text-muted-foreground">
        {post.meta.date} · {post.meta.readingTime}
      </p>

      <div className="prose prose-invert prose-headings:font-semibold prose-a:text-primary mt-12 max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
