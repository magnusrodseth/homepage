import { Icons } from "@/components/icons";
import { truncate } from "@/lib/utils";
import { OpenGraphImageSchema } from "@/schemas/og";
import { ImageResponse } from "@vercel/og";
import { slate } from "tailwindcss/colors";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const values = OpenGraphImageSchema.parse(
      Object.fromEntries(url.searchParams)
    );

    const heading = truncate({
      string: values.heading,
      length: 60,
    });

    const description = truncate({
      string: values.description,
      length: 160,
    });

    const { mode } = values;
    const paint = mode === "dark" ? slate[50] : slate[900];

    const fontSize = heading.length > 100 ? "70px" : "100px";

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-16 w-full h-full items-start"
          style={{
            color: paint,
            background:
              mode === "dark"
                ? `linear-gradient(90deg, ${slate[900]} 0%, ${slate[800]} 100%)`
                : `linear-gradient(90deg, ${slate[50]} 0%, ${slate[100]} 100%)`,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" fill="#020817" />
            <path
              d="M3.85981 7.30308C4.09058 7.30308 4.28597 7.34923 4.44597 7.44154C4.60904 7.53385 4.75366 7.64154 4.87981 7.76462C5.00597 7.88462 5.12751 7.99231 5.24443 8.08769C5.36135 8.18 5.49058 8.22615 5.63212 8.22615C5.82289 8.22615 5.99212 8.15077 6.13981 8C6.29058 7.84923 6.42597 7.66308 6.54597 7.44154L7.09981 7.72769C7.01058 7.90308 6.90135 8.08154 6.77212 8.26308C6.64289 8.44154 6.48289 8.59231 6.29212 8.71538C6.10443 8.83538 5.8752 8.89538 5.60443 8.89538C5.38904 8.89538 5.20135 8.84923 5.04135 8.75692C4.88443 8.66462 4.74135 8.55846 4.61212 8.43846C4.48289 8.31538 4.35674 8.20769 4.23366 8.11538C4.11058 8.02 3.97674 7.97231 3.83212 7.97231C3.63212 7.97231 3.45981 8.04769 3.3152 8.19846C3.17058 8.34615 3.03828 8.53077 2.91828 8.75231L2.36443 8.48C2.45674 8.29846 2.56597 8.11692 2.69212 7.93538C2.82135 7.75385 2.97981 7.60308 3.16751 7.48308C3.3552 7.36308 3.58597 7.30308 3.85981 7.30308ZM8.61231 11.9508L7.98462 11.6738L11.9354 3.52769L12.5538 3.83231L8.61231 11.9508Z"
              fill="#F8FAFC"
            />
          </svg>

          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex text-xl uppercase font-bold tracking-tight text-3xl"
              style={{ fontWeight: "normal" }}
            >
              {values.type}
            </div>
            <div
              tw="flex leading-[1.1] text-6xl font-bold my-2"
              style={{
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>

            <div tw="flex text-xl my-4" style={{ fontWeight: "normal" }}>
              {description}
            </div>
          </div>
          <div tw="flex items-center w-full justify-end">
            <div tw="flex text-lg" style={{ fontWeight: "normal" }}>
              <span>NTVA: Norges Tekniske Vitenskapsakademi</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
