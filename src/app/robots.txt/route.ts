import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET(): Response {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Content-Signal: search=yes, ai-train=no, ai-input=yes",
    "",
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
