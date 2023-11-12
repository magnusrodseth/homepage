import { Icons } from "@/components/icons";
import { truncate } from "@/lib/utils";
import { OpenGraphImageSchema } from "@/schemas/og";
import { ImageResponse } from "@vercel/og";
import { slate } from "tailwindcss/colors";
import logo from "/logo.svg";

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
          {logo}

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
