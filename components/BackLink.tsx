import { ChevronDoubleLeftIcon } from "@heroicons/react/outline"
import Link from "next/link"
import capitalize from "../utils/capitalize"

interface BackLinkProps {
    href: string;
    title: string;
}

const BackLink = ({ href, title }: BackLinkProps) => {
    return (
        <Link href={`${href}`} passHref>
            <div className="hover:cursor-pointer left-on-hover py-4 flex flex-row space-x-2 justify-center align-center text-indigo-700 dark:text-lime-200">
                <ChevronDoubleLeftIcon className={"icon"} />
                <span className="text-xl mt-0.5">
                    {capitalize(title)}
                </span>
            </div>
        </Link >
    )

}

export default BackLink