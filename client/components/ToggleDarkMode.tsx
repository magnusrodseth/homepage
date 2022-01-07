import { Switch } from "@headlessui/react"
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import { memo } from "react"
import { useDarkMode } from "../hooks/useDarkMode"
import classNames from "../utils/classNames"

const ToggleDarkMode = memo(() => {
    const [isDark, setIsDark] = useDarkMode()

    return (
        <Switch
            checked={isDark}
            onChange={(checked) => setIsDark(checked)}
            className={classNames(`${isDark ? 'dark:bg-indigo-400' : 'bg-gray-400'}`,
                "relative inline-flex items-center h-8 rounded-full w-16")}
        >
            <span className="sr-only">Dark mode</span>
            <span
                className={`${isDark ? 'translate-x-9' : 'translate-x-1'
                    } inline-block w-6 h-6 transform rounded-full  smooth`}
            >{isDark
                ? <MoonIcon className="w-6 -scale-x-100 text-gray-900" />
                : <SunIcon className="w-6 text-white" />}
            </span>
        </Switch>
    )
})

ToggleDarkMode.displayName = "ToggleDarkMode";

export default ToggleDarkMode;  