import { Theme, ThemeState } from "@/schemas/state";
import { z } from "zod";

export type ITheme = z.infer<typeof Theme>;
export type IThemeState = z.infer<typeof ThemeState>;
export type IThemeSlice = {
  theme: ITheme;
  toggleTheme: () => void;
};
