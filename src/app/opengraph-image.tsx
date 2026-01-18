import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
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

export default async function Image() {
  const profilePicture = await readFile(
    join(process.cwd(), "public/profile-picture.jpg")
  );
  const profileSrc = `data:image/jpeg;base64,${profilePicture.toString("base64")}`;

  const text = `${siteConfig.name.toUpperCase()}Developer crafting high-quality, performant solutions`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <img
            src={profileSrc}
            width={260}
            height={260}
            style={{
              borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.1)",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "4px",
                background: "linear-gradient(90deg, #e0e7ff 0%, #a5b4fc 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {siteConfig.name.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: "26px",
                color: "#94a3b8",
                maxWidth: "550px",
                lineHeight: 1.4,
              }}
            >
              Developer crafting high-quality, performant solutions
            </div>
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
