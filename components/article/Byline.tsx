import { DotsHorizontalIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import { format } from "date-fns"
import HorizontalDivider from "../HorizontalDivider"

interface BylineProps {
    publishedAt: Date;
    updatedAt?: Date;
    readingTimeInMinutes: number;
}

const Byline = ({ publishedAt, updatedAt, readingTimeInMinutes }: BylineProps) => {
    return (
        <div className="flex flex-col">
            <div className={classNames(
                "flex flex-col space-y-1 md:space-y-0 md:flex-row md:space-x-2",
                "px-4 pt-4 text-sm"
            )}>
                <span>
                    <span className="italic">Published:{" "}</span>
                    {format(publishedAt, "MMMM dd yyyy")}
                </span>
                <DotsHorizontalIcon className="hidden md:block w-4" />
                {updatedAt ? <>
                    <span>
                        <span className="italic">Last updated:{" "}</span>
                        {format(updatedAt, "MMMM dd yyyy")}
                    </span><DotsHorizontalIcon className="hidden md:block w-4" />
                </> : null}
                <span>{Math.max(1, readingTimeInMinutes)} minute read</span>
            </div>

            <HorizontalDivider className="mx-4 mb-6" />
        </div>
    )
}

export default Byline