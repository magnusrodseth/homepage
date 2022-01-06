import { Switch } from "@headlessui/react"
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
                "relative inline-flex items-center h-8 rounded-full w-16 smooth")}
        >
            <span className="sr-only">Dark mode</span>
            <span
                className={`${isDark ? 'translate-x-9' : 'translate-x-1'
                    } inline-block w-6 h-6 transform bg-gray-200 rounded-full smooth`}
            />
        </Switch>
    )
})

ToggleDarkMode.displayName = "ToggleDarkMode";

export default ToggleDarkMode;  