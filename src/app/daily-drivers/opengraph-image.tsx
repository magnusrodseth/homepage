import { DAILY_DRIVERS_PAGE } from "@/config/pages";
import { brandedOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = DAILY_DRIVERS_PAGE.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return brandedOgImage({
    kicker: "~/daily-drivers",
    title: DAILY_DRIVERS_PAGE.title,
    description: DAILY_DRIVERS_PAGE.tagline,
  });
}
