import * as z from "zod";

export const OpenGraphImageSchema = z.object({
  heading: z.string(),
  description: z.string(),
  type: z.string(),
  mode: z.enum(["light", "dark"]).default("light"),
});
