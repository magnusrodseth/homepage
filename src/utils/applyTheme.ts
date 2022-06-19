import { THEME } from '@/constants';
import { ITheme } from '@/types/state';

const applyTheme = (theme: ITheme) => {
    const { darkTheme, lightTheme } = THEME;
    const root = window.document.documentElement;
    const changeToDark = theme === darkTheme;

    root.classList.remove(changeToDark ? lightTheme : darkTheme);
    root.classList.add(theme);
};

export default applyTheme;
