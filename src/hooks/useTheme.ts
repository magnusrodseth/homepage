import useThemeStore from "@/state/useThemeStore";
import { IThemeState } from "@/types/state";
import applyTheme from "@/utils/applyTheme";
import { useEffect } from "react";

const useTheme = () => {
  const theme = useThemeStore(
    (state) => (state as unknown as IThemeState).theme
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return theme;
};

export default useTheme;
