import { useEffect } from "react"
import { usePrefersDarkMode } from "./usePrefersDarkMode"
import { useSafeLocalStorage } from "./useSafeLocalStorage"

/**
 * A custom hook for determining if dark mode is enabled in the React Context.
 * Source: https://jeffjadulco.com/blog/dark-mode-react-tailwind
 * @returns a hook to determine if dark mode is enabled.
 */
export const useDarkMode = () => {
    const prefersDarkMode = usePrefersDarkMode()

    const [isEnabled, setIsEnabled] = useSafeLocalStorage('dark-mode', undefined)

    const enabled =
        isEnabled === undefined ? prefersDarkMode : isEnabled

    useEffect(() => {
        if (window === undefined) return
        const root = window.document.documentElement
        root.classList.remove(enabled ? 'light' : 'dark')
        root.classList.add(enabled ? 'dark' : 'light')
    }, [enabled])

    return [enabled, setIsEnabled]
}