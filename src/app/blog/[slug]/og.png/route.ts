import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { brandedOgImage } from "@/lib/og";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return brandedOgImage({
    kicker: `Blog · ${formatDate(post.date)}`,
    title: post.title,
    description: post.description,
  });
}
