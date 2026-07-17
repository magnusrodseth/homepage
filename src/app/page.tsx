import Link from "next/link";
import { Metadata } from "next";
import Socials from "@/components/socials";
import { H1, H3, Muted, Small } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { cn, formatDate } from "@/lib/utils";
import IndexContent from "@/content/pages/index.mdx";
import profilePicture from "../../public/profile-picture.jpg";
import { ProfileImage } from "@/components/profile-image";
import { Testimonials } from "@/components/testimonials";
import { GitHubContributions } from "@/components/github-calendar";
import { SpotifyRecentTracks } from "@/components/spotify-recent";
import { getBlogPosts } from "@/lib/blog";
import { Icons } from "@/components/icons";

// The Spotify/GitHub activity data revalidates; everything else is static.
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/profile-picture.jpg`,
  jobTitle: "Full-stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Capra Consulting",
    url: "https://capraconsulting.no/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Norwegian University of Science and Technology",
    url: "https://www.ntnu.edu/",
  },
  sameAs: [siteConfig.github, siteConfig.linkedIn],
};

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 2);

  return (
    <div className="mx-auto max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 items-center">
        <div className="order-2 sm:order-1 flex flex-col justify-center">
          <p className="animate-slide-enter text-xl sm:text-2xl text-muted-foreground">
            Hi! I&apos;m
          </p>
          <H1
            className={cn(
              "animate-slide-enter stagger-100 uppercase text-4xl sm:text-5xl font-extrabold tracking-tight -mt-1",
              "bg-linear-to-r from-indigo-100 to-indigo-400 text-transparent bg-clip-text"
            )}
          >
            {siteConfig.name}
          </H1>
        </div>

        <div className="order-1 sm:order-2 w-full max-w-[280px] sm:max-w-none mx-auto sm:mx-0">
          <ProfileImage
            src={profilePicture}
            alt={`Profile picture of ${siteConfig.name}`}
          />
        </div>
      </div>

      <div className="mt-4 mdx">
        <IndexContent />
      </div>

      <div className="flex justify-start items-center gap-x-4 py-8 animate-slide-enter stagger-300">
        <Muted>
          <span className="font-semibold">Psst.</span> You can reach me on
        </Muted>
        <Socials />
      </div>

      {recentPosts.length > 0 && (
        <section className="mt-8 animate-slide-enter stagger-400">
          <div className="flex items-baseline justify-between mb-6">
            <H3 className="text-xl">Recent writing</H3>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              cd /blog
            </Link>
          </div>

          <div className="flex flex-col gap-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={cn(
                  "block rounded-lg px-4 py-3",
                  "border border-border/50 bg-background/50 backdrop-blur-sm",
                  "transition-all duration-300",
                  "hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
                )}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-base font-medium text-foreground">
                    {post.title}
                  </span>
                  <Small className="text-muted-foreground line-clamp-2 leading-normal font-normal">
                    {post.description}
                  </Small>
                  <Muted className="font-mono text-xs mt-1 flex items-center gap-2">
                    {formatDate(post.date)}
                    <Icons.dot className="inline h-3 w-3" />
                    {post.readingTimeMinutes} min read
                    {post.lang === "no" && (
                      <>
                        <Icons.dot className="inline h-3 w-3" />
                        norsk
                      </>
                    )}
                  </Muted>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Testimonials />

      <section className="mt-16 animate-slide-enter stagger-500">
        <H3 className="mb-6 text-xl">Activity</H3>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-mono">
              GitHub
            </p>
            <GitHubContributions />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-mono">
              Recently Played on Spotify
            </p>
            <SpotifyRecentTracks />
          </div>
        </div>
      </section>
    </div>
  );
}
