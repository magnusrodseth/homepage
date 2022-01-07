import { CalendarIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PageWrapper from "../../components/PageWrapper";
import Wrapper from "../../components/Wrapper";
import { BlogPost, useCompactBlogPostsQuery } from "../../generated/graphql"
import classNames from "../../utils/classNames";
import { parseDate } from "../../utils/parseDate";
import Heading from "../../components/Heading";

const BlogIndex = () => {
    const { data, loading, error } = useCompactBlogPostsQuery();

    const compactBlogPosts = data?.blogPosts?.data;

    return (
        <PageWrapper>
            {loading ? <Loading /> : null}
            {error ? <Error /> : null}
            {!loading && !error ? <div>
                <Heading
                    header={`💭 Blog`}
                    description={`
                    Below, you can find a collection of my personal blog posts. 
                    Click on a title to read the full blog post.
                    `} />

                <div className={classNames(
                    "grid grid-cols-1 md:grid-cols-2"
                )}>
                    {compactBlogPosts ? compactBlogPosts.map((post) => {
                        const id = post.id;
                        const attributes = post.attributes as BlogPost;
                        const { title, description, updatedAt } = attributes;

                        return (
                            <Wrapper className={classNames(
                                "hover:cursor bg-sky-50 dark:bg-gray-700 rise-on-hover p-2"
                            )} key={id}>
                                {/* Title */}
                                <Link href={`blog/${id}`} passHref>
                                    <a>
                                        <h1 className={classNames(
                                            "text-xl md:text-3xl m-2 smooth",
                                            "font-bold tracking-wide smooth",
                                            "text-gray-700 dark:text-sky-200",
                                            "dark:hover:text-indigo-300 hover:text-black"
                                        )}>{title}
                                        </h1>
                                    </a>
                                </Link>

                                {/* Description */}
                                <Link href={`blog/${id}`} passHref>
                                    <a className="flex flex-row space-x-3 p-2 md:p-4">
                                        <ChevronDoubleRightIcon className="icon text-indigo-600 dark:text-lime-200" />
                                        <h2 className="text-lg md:text-xl mt-0.5">
                                            {description}
                                        </h2>
                                    </a>
                                </Link>

                                {/* Updated at */}
                                <Link href={`blog/${id}`} passHref>
                                    <a className="flex flex-row space-x-3 p-2 md:p-4">
                                        <CalendarIcon className="icon text-indigo-700 dark:text-lime-200" />
                                        <h2 className="text-lg md:text-xl mt-0.5">
                                            {parseDate(updatedAt as string)}
                                        </h2>
                                    </a>
                                </Link>
                            </Wrapper>
                        );
                    }) : ""}
                </div>
            </div> : null}
        </PageWrapper>
    )
}

export default BlogIndex

