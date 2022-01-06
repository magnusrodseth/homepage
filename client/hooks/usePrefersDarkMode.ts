import { useEffect, useState } from 'react'

/**
 * A custom hook to determine if the user prefers dark mode.
 * Source: https://jeffjadulco.com/blog/dark-mode-react-tailwind
 * @returns a boolean indicating if the user prefers dark mode.
 */
export const usePrefersDarkMode = () => {
    const [value, setValue] = useState(true)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setValue(mediaQuery.matches)

        const handler = () => setValue(mediaQuery.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return value
}