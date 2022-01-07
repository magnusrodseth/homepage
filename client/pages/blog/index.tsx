import { CalendarIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PageWrapper from "../../components/PageWrapper";
import Wrapper from "../../components/Wrapper";
import { BlogPost, useCompactBlogPostsQuery } from "../../generated/graphql"
import classNames from "../../utils/classNames";
import { parseDate } from "../../utils/parseDate";

const BlogIndex = () => {
    const { data, loading, error } = useCompactBlogPostsQuery();

    const compactBlogPosts = data?.blogPosts?.data;

    return (
        <PageWrapper>
            {loading ? <Loading /> : null}
            {error ? <Error /> : null}
            {!loading && !error ? <>
                <div className="text-center mx-4">
                    <h1 className={classNames(
                        "smooth m-auto text-4xl md:text-6xl my-6 font-mono font-bold",
                        "text-indigo-400 dark:text-indigo-300 tracking-tight"
                    )}>
                        💭{" "}Blog
                    </h1>
                    <p className="text-lg md:text-2xl my-6">
                        Below, you can find a collection of my personal blog posts.{" "}
                        <span className="font-bold tracking-wide">
                            Click on a title to read the full blog post.
                        </span>
                    </p>
                </div><div className={classNames(
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
                                    <h1 className={classNames(
                                        "text-xl md:text-3xl m-2 smooth",
                                        "font-bold tracking-wide smooth hover:cursor-pointer",
                                        "text-gray-700 dark:text-sky-200",
                                        "dark:hover:text-indigo-300 hover:text-black"
                                    )}>{title}
                                    </h1>
                                </Link>

                                {/* Description */}
                                <div className="flex flex-row space-x-3 p-2 md:p-4">
                                    <ChevronDoubleRightIcon className="icon text-indigo-600 dark:text-lime-200" />
                                    <h2 className="text-lg md:text-xl mt-0.5">
                                        {description}
                                    </h2>
                                </div>

                                {/* Updated at */}
                                <div className="flex flex-row space-x-3 p-2 md:p-4">
                                    <CalendarIcon className="icon text-indigo-700 dark:text-lime-200" />
                                    <h2 className="text-lg md:text-xl mt-0.5">
                                        {parseDate(updatedAt as string)}
                                    </h2>
                                </div>
                            </Wrapper>
                        );
                    }) : ""}
                </div>
            </> : null}
        </PageWrapper>
    )
}

export default BlogIndex

{/* {compactBlogPosts
        ? compactBlogPosts.map((post, index) => {
            

            return (
                <Link href={`/blog/${id}`} key={index} passHref>
                    <div key={index}>

                        <h1>{title}</h1>
                        <h2>{description}</h2>
                        <h3>Last updated: {updatedAt}</h3>

                    </div>
                </Link>
            )
        })
        : ""}</div> */}