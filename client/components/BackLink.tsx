import { ChevronDoubleLeftIcon } from "@heroicons/react/outline"
import Link from "next/link"
import capitalize from "../utils/capitalize"

interface BackLinkProps {
    href: string;
    title: string;
}

const BackLink = ({ href, title }: BackLinkProps) => {
    return <div className="left-on-hover py-4 flex flex-row space-x-2 justify-center align-center text-indigo-700 dark:text-lime-200">
        <ChevronDoubleLeftIcon className={"icon"} />
        <Link href={`${href}`} passHref>
            <span className="text-xl mt-0.5 hover:cursor-pointer">
                {capitalize(title)}
            </span>
        </Link>
    </div>
}

export default BackLink