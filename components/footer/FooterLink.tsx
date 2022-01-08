import Link from "next/link"
import classNames from "../../utils/classNames"
import Icon from "../icons/Icon"

interface FooterLink {
    href: string;
    label: string;
    icon: JSX.Element;
}

const FooterLink = ({ href, label, icon }: FooterLink) => {
    return (
        <Link href={href} passHref
        >
            <a target="_blank" rel="noreferrer" className="flex flex-col space-y-2 justify-center rise-on-hover">
                <Icon className={classNames("text-gray-800 m-auto dark:text-gray-300")}>
                    {icon}
                </Icon>
                <span className="dark:text-gray-300 text-xs">{label}</span>
            </a>
        </Link>
    )
}

export default FooterLink