import classNames from "classnames";
import { parseISO } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { Article } from "../../types/article";
import capitalize from "../../utils/capitalize";
import BackLink from "../BackLink";
import { components } from "../MdxComponents";
import Tag from "../Tag";
import Tags from "../Tags";
import ArticleWrapper from "./ArticleWrapper";
import Byline from "./Byline";

interface ArticleComponentProps { article: Article, backTo: string }

const ArticleComponent = ({ article, backTo }: ArticleComponentProps) => {
    const { code, frontmatter } = article

    const Component: any = useMemo(() => getMDXComponent(code), [code])


    const publishedAt = parseISO(frontmatter.publishedAt)
    const updatedAt = frontmatter.updatedAt
        ? parseISO(frontmatter.updatedAt)
        : undefined

    const readingTimeInMinutes = Math.floor(frontmatter.readingTime?.minutes as number);

    return (
        <ArticleWrapper>
            <Byline
                publishedAt={publishedAt}
                updatedAt={updatedAt}
                readingTimeInMinutes={readingTimeInMinutes}
            />

            <div className="px-4 w-full">
                <div className="flex flex-row my-1 flex-wrap">
                    <Tags tags={frontmatter.tags} className={classNames(
                        "bg-gray-200 text-indigo-700 dark:bg-gray-700 dark:text-indigo-300",
                        "hover:bg-gray-100 hover:text-indigo-800 hover:dark:bg-gray-800 hover:dark:text-indigo-200"
                    )} />
                </div>

                {/* Title and subtitle */}
                <h1 className={classNames(
                    "text-2xl md:text-4xl my-2",
                    "font-bold tracking-wide smooth",
                    "text-gray-700 dark:text-sky-200",
                )}>{frontmatter.title}
                </h1>

                <Component components={components} />

                <div className="max-w-max m-auto">
                    <BackLink href={`/${backTo.toLowerCase()}`} title={`${capitalize(backTo)}`} />
                </div>
            </div>
        </ArticleWrapper>
    )
}

export default ArticleComponent;