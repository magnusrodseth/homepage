import { createContext, useState, useEffect } from 'react'
import { COLOR_THEME, DARK, LIGHT } from './constants'

export type ThemeName = 'light' | 'dark' | string

type ThemeContextType = {
    theme: ThemeName
    setTheme: (name: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const ThemeProvider = ({ currentTheme, children }: any) => {
    const [theme, setTheme] = useState(currentTheme)

    const rawSetTheme = (theme: ThemeName) => {
        const root = window.document.documentElement
        const isDark = theme === DARK

        root.classList.remove(isDark ? LIGHT : DARK)
        root.classList.add(theme)

        localStorage.setItem(COLOR_THEME, theme)
    }

    if (currentTheme) {
        rawSetTheme(currentTheme)
    }

    useEffect(() => {
        rawSetTheme(theme)
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
