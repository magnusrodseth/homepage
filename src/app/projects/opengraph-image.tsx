import { PROJECTS_PAGE } from "@/config/pages";
import { brandedOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = PROJECTS_PAGE.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return brandedOgImage({
    kicker: "~/projects",
    title: PROJECTS_PAGE.title,
    description: PROJECTS_PAGE.tagline,
  });
}
