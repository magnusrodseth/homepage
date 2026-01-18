import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@400;600&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      <div style={{ background: "#0f172a", width: "100%", height: "100%" }} />,
      { ...size }
    );
  }

  const profilePicture = await readFile(
    join(process.cwd(), "public/profile-picture.jpg")
  );
  const profileSrc = `data:image/jpeg;base64,${profilePicture.toString("base64")}`;

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const text = `BLOG${post.title}${post.description}${siteConfig.name.toUpperCase()}${date}magnusrodseth.com`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "4px",
              fontWeight: 600,
            }}
          >
            Blog
          </div>
          <div
            style={{
              fontSize: post.title.length > 50 ? "44px" : "52px",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.2,
              maxWidth: "950px",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            {post.description.length > 140
              ? post.description.slice(0, 140) + "..."
              : post.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src={profileSrc}
              width={56}
              height={56}
              style={{
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.1)",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  color: "#f1f5f9",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {siteConfig.name.toUpperCase()}
              </div>
              <div style={{ fontSize: "16px", color: "#64748b" }}>{date}</div>
            </div>
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            magnusrodseth.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await loadGoogleFont("Inter", text),
          style: "normal",
        },
      ],
    }
  );
}
