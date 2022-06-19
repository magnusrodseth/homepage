import { THEME } from "@/constants";
import { ITheme, IThemeSlice, IThemeState } from "@/types/state";
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

const { lightTheme, darkTheme } = THEME;

export type IStore = IThemeSlice;

type IPersist = (
  config: StateCreator<IStore>,
  options: PersistOptions<IStore>
) => StateCreator<IStore>;

const useThemeStore = create<IStore>(
  (persist as unknown as IPersist)(
    (set) => ({
      theme: darkTheme as ITheme,
      toggleTheme: () =>
        set((state: IThemeState) => ({
          theme:
            state.theme === lightTheme
              ? (darkTheme as ITheme)
              : (lightTheme as ITheme),
        })),
    }),
    { name: "theme-store" }
  )
);

export default useThemeStore;
