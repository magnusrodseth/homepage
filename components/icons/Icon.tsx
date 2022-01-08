import classNames from "../../utils/classNames"

interface IconProps {
    children: any;
    className?: string;
}

const Icon = ({ children, className }: IconProps) => {
    // Add className to style if it is defined. Else, keep className="icon"
    const style = ["icon", className].join(" ");

    return (
        <div className={classNames(style)} >
            {children}
        </div>
    )
}

export default Icon