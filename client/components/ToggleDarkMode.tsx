import { memo, useContext, useEffect } from "react"
import { ThemeContext } from "../utils/theme/ThemeContext"
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import classNames from "../utils/classNames"

const ToggleDarkMode = memo(() => {
    const [enabled, setEnabled] = useState(true)
    const { theme, setTheme } = useContext(ThemeContext)

    useEffect(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(`${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`,
                "relative inline-flex items-center h-8 rounded-full w-16")}
        >
            <span className="sr-only">Dark mode</span>
            <span
                className={`${enabled ? 'translate-x-9' : 'translate-x-1'
                    } inline-block w-6 h-6 transform bg-white rounded-full`}
            />
        </Switch>
    )
})

ToggleDarkMode.displayName = "ToggleDarkMode";

export default ToggleDarkMode;  