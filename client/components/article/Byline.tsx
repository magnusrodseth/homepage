import { DotsHorizontalIcon } from "@heroicons/react/outline"
import { parseDate } from "../../utils/parseDate"

interface BylineProps {
    lastUpdated: string;
    readingTimeInMinutes: number;
}

const Byline = ({ lastUpdated, readingTimeInMinutes }: BylineProps) => {
    return (
        <div className="flex flex-col">
            <div className="pl-6 py-2 flex flex-row space-x-2 text-sm">
                <span>
                    <span className="italic">Last updated:{" "}</span>
                    {parseDate(lastUpdated)}
                </span>
                <DotsHorizontalIcon className="w-4" />
                <span>{readingTimeInMinutes} minute read</span>
            </div>

            {/* Custom bottom border */}
            <div className="mx-4 my-2 smooth h-0.5 rounded-lg bg-indigo-400 dark:bg-lime-200" />
        </div>
    )
}

export default Byline