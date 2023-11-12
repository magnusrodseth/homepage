import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";
import { H2 } from "@/components/ui/typography";
import BackLink from "@/components/back-link";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div>
      <H2>Blog</H2>

      <BackLink />
    </div>
  );
}
