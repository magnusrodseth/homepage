import { ChevronDoubleRightIcon } from "@heroicons/react/outline"
import classNames from "classnames"
import Link from "next/link"
import { FrontMatter } from "../../types/frontmatter"
import Tag from "../Tag"
import Tags from "../Tags"
import Wrapper from "../Wrapper"

const ArticleCard = ({ article }: { article: FrontMatter }) => {
    return (
        <Wrapper className={classNames(
            "bg-indigo-100 dark:bg-gray-700 rise-on-hover p-2"
        )}>
            <div className="">
                <div className="">
                    {/* Title */}
                    <Link href={`projects/${article.slug}`} passHref>
                        <a>
                            <h1 className={classNames(
                                "text-xl md:text-3xl m-2 smooth",
                                "font-bold tracking-wide smooth",
                                "text-gray-700 dark:text-sky-200",
                                "dark:hover:text-indigo-300 hover:text-black"
                            )}>{article.title}
                            </h1>
                        </a>
                    </Link>
                    {/* Description */}
                    <Link href={`projects/${article.slug}`} passHref>
                        <a className="flex flex-row space-x-3 p-2 md:p-4">
                            <ChevronDoubleRightIcon className="icon text-indigo-600 dark:text-lime-200" />
                            <h2 className="text-md md:text-xl mt-0.5">
                                {article.description}
                            </h2>
                        </a>
                    </Link>

                    <div className="flex flex-row my-3 flex-wrap">
                        <Tags tags={article.tags} className={classNames(
                            "bg-gray-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-400",
                            "hover:bg-white hover:text-indigo-800 hover:dark:bg-gray-900 hover:dark:text-indigo-300"
                        )} />
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}

export default ArticleCard;