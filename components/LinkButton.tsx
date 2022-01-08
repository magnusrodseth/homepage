import Link from "next/link"
import classNames from "../utils/classNames"

interface LinkButtonProps {
    href: string;
    className?: string;
    label: string;
}

const LinkButton = ({ href, className, label }: LinkButtonProps) => {
    const styles = className ? className : "";
    return (
        <div className="inline-flex rounded-md shadow">
            <Link href={href}>
                <a className={classNames(styles)}>
                    {label}
                </a>
            </Link>
        </div >
    )
}

export default LinkButton