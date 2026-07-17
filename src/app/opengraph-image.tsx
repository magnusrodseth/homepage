import { siteConfig } from "@/config/site";
import {
  brandedOgImage,
  loadProfilePictureDataUri,
  OG_SIZE,
  OG_CONTENT_TYPE,
} from "@/lib/og";

export const alt = siteConfig.name;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return brandedOgImage({
    title: siteConfig.name,
    description:
      "Full-stack developer crafting high-quality, performant solutions.",
    imageSrc: await loadProfilePictureDataUri(),
  });
}
