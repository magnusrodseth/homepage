import { createContext, useState, useEffect } from 'react'
import { COLOR_THEME, DARK, LIGHT } from './constants'

const getInitialTheme = () => {
    if (typeof window !== 'undefined' &&
        window.localStorage) {

        const storedPrefs =
            window.localStorage.getItem('color-theme')
        if (typeof storedPrefs === 'string') {
            return storedPrefs
        }

        const userMedia =
            window.matchMedia('(prefers-color-scheme: dark)')
        if (userMedia.matches) {
            return 'dark'
        }
    }

    // If you want to use light theme as the default, 
    // return "light" instead
    return 'dark'
}

/**
 * A theme can either be light or dark.
 */
export type ThemeName = 'light' | 'dark' | string

type ThemeContextType = {
    theme: ThemeName
    setTheme: (name: ThemeName) => void
}

/**
 * This conext is used throughout the application when getting and setting the color theme.
 */
export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

/**
 * The ThemeProvider is used to provide the application with the current color theme.
 * @returns a wrapper component with the current theme.
 */
export const ThemeProvider = ({ currentTheme, children }: any) => {
    const [theme, setTheme] = useState(getInitialTheme)

    // Update state of theme
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
