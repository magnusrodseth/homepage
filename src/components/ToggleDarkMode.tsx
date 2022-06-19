import useThemeStore from "@/state/useThemeStore"
import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import { memo } from "react"
import classNames from "../utils/classNames"
import { THEME } from "@/constants"

const ToggleDarkMode = memo(() => {
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === THEME.darkTheme

    return (
        <Switch
            checked={isDark}
            onChange={toggleTheme}
            className={classNames(`${isDark ? 'dark:bg-indigo-400' : 'bg-gray-400'}`,
                "relative inline-flex items-center h-8 rounded-full w-16")}
        >
            <span className="sr-only">Dark mode</span>
            <span
                className={`${isDark ? 'translate-x-9' : 'translate-x-1'
                    } inline-block w-6 h-6 transform rounded-full  smooth`}
            >{isDark
                ? <MoonIcon className="w-6 text-gray-900" />
                : <SunIcon className="w-6 text-white" />}
            </span>
        </Switch>
    )
})

ToggleDarkMode.displayName = "ToggleDarkMode";

export default ToggleDarkMode;  