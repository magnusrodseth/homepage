import classNames from "../utils/classNames";

interface HorizontalDividerProps {
    className?: string
}

const HorizontalDivider = ({ className }: HorizontalDividerProps) => {
    const styles = className ? className : "";

    return (
        <div className={classNames(
            styles,
            "my-2 smooth h-0.5 rounded-lg bg-indigo-400 dark:bg-lime-200"
        )} />
    )
}

export default HorizontalDivider