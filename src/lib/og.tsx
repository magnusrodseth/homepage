import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Brand palette mirroring the site's dark theme tokens (globals.css). */
const BRAND = {
  bg: "#020817",
  fg: "#f8fafc",
  primary: "#818cf8",
  muted: "#94a3b8",
  faint: "#64748b",
  border: "#1e293b",
  gradientOverlay:
    "radial-gradient(ellipse at 0% 0%, #818cf833 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, #6366f122 0%, transparent 60%)",
};

const FONT_DIR = join(process.cwd(), "node_modules/geist/dist/fonts");

async function loadFonts() {
  const [sansRegular, sansSemiBold, monoRegular] = await Promise.all([
    readFile(join(FONT_DIR, "geist-sans/Geist-Regular.ttf")),
    readFile(join(FONT_DIR, "geist-sans/Geist-SemiBold.ttf")),
    readFile(join(FONT_DIR, "geist-mono/GeistMono-Regular.ttf")),
  ]);

  return [
    { name: "Geist", data: sansRegular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: sansSemiBold, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: monoRegular, weight: 400 as const, style: "normal" as const },
  ];
}

const DESCRIPTION_MAX_LENGTH = 200;

type BrandedOgImageProps = {
  /** Small mono label above the title, e.g. "Blog" or a date. */
  kicker?: string;
  title: string;
  description?: string;
  /** Data URI for an optional portrait shown beside the text. */
  imageSrc?: string;
};

export async function brandedOgImage({
  kicker,
  title,
  description,
  imageSrc,
}: BrandedOgImageProps) {
  const truncatedDescription =
    description && description.length > DESCRIPTION_MAX_LENGTH
      ? `${description.slice(0, DESCRIPTION_MAX_LENGTH)}…`
      : description;

  const titleSize = title.length > 50 ? 48 : title.length > 30 ? 60 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: BRAND.bg,
          backgroundImage: BRAND.gradientOverlay,
          fontFamily: "Geist",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: "flex",
            width: "80px",
            height: "4px",
            backgroundColor: BRAND.primary,
            borderRadius: "2px",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "60px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {kicker && (
              <div
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: 22,
                  color: BRAND.primary,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                }}
              >
                {kicker}
              </div>
            )}

            <div
              style={{
                fontSize: titleSize,
                fontWeight: 600,
                color: BRAND.fg,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>

            {truncatedDescription && (
              <div
                style={{
                  fontSize: 24,
                  color: BRAND.muted,
                  lineHeight: 1.5,
                  maxWidth: "900px",
                }}
              >
                {truncatedDescription}
              </div>
            )}
          </div>

          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element -- satori renders raw <img>, next/image is unavailable here
            <img
              src={imageSrc}
              alt=""
              width={240}
              height={240}
              style={{
                borderRadius: "50%",
                border: `4px solid ${BRAND.border}`,
                objectFit: "cover",
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${BRAND.border}`,
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                fontFamily: "Geist Mono",
                fontSize: 22,
                color: BRAND.primary,
              }}
            >
              ~/magnusrodseth_
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: BRAND.fg,
              }}
            >
              {siteConfig.name}
            </div>
          </div>

          <div
            style={{
              fontFamily: "Geist Mono",
              fontSize: 16,
              color: BRAND.faint,
            }}
          >
            www.magnusrodseth.com
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: await loadFonts(),
    }
  );
}

export async function loadProfilePictureDataUri(): Promise<string> {
  const profilePicture = await readFile(
    join(process.cwd(), "public/profile-picture.jpg")
  );
  return `data:image/jpeg;base64,${profilePicture.toString("base64")}`;
}
