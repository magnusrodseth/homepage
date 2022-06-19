import Link from "next/link"
import classNames from "../utils/classNames"
import ReactGA from "react-ga"

interface LinkButtonProps {
    href: string;
    className?: string;
    label: string;
}

const LinkButton = ({ href, className, label }: LinkButtonProps) => {
    const styles = className ? className : "";

    const handleOnClick = () => {
        ReactGA.event({
            category: "Link",
            action: "Clicked link"
        })
    }

    return (
        <div
            className="inline-flex rounded-md shadow"
            onClick={handleOnClick}>
            <Link href={href}>
                <a className={classNames(styles)}>
                    {label}
                </a>
            </Link>
        </div >
    )
}

export default LinkButton