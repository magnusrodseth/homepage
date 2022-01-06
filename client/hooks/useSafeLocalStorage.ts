import { useState } from 'react'

/**
 * A custom hook for interacting with local storage when toggling dark mode.
 * Source: https://jeffjadulco.com/blog/dark-mode-react-tailwind.
 * @returns a hook for interacting with local storage when toggling dark mode.
 */
export function useSafeLocalStorage(key: string, initialValue: string | undefined) {
    const [valueProxy, setValueProxy] = useState(() => {
        try {
            const value = window.localStorage.getItem(key)
            return value ? JSON.parse(value) : initialValue
        } catch {
            return initialValue
        }
    })

    const setValue = (value: string) => {
        try {
            window.localStorage.setItem(key, value)
            setValueProxy(value)
        } catch {
            setValueProxy(value)
        }
    }

    return [valueProxy, setValue]
}