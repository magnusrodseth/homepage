import { z } from "zod";

export const Theme = z.enum(["dark", "light"]);

export const ThemeState = z.object({
  theme: Theme,
});
