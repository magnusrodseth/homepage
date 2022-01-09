import classNames from "classnames";

interface TagProps {
    tag: string;
    className?: string
}

const Tag = ({ tag, className }: TagProps) => {
    const styles = className ? className : "";
    return (
        <span className={classNames(
            "smooth rounded-full",
            "py-2 text-sm md:text-md px-3 m-1",
            styles)
        }>
            {tag}
        </span>
    )
}

export default Tag;