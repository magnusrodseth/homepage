import { CalendarIcon, ChatIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Wrapper from "../../components/Wrapper";
import { BlogPost, Project, useCompactBlogPostsQuery } from "../../generated/graphql"
import classNames from "../../utils/classNames";
import { parseDate } from "../../utils/parseDate";

const BlogIndex = () => {
    const { data, loading, error } = useCompactBlogPostsQuery();

    if (loading) {
        return <h1>loading</h1>
    }

    if (error) {
        return <h1>error</h1>
    }

    const compactBlogPosts = data?.blogPosts?.data;

    return (
        <div className="h-full">
            <div className="text-center mx-4">
                <h1 className="m-auto text-4xl md:text-6xl my-6 font-mono font-bold text-indigo-300">
                    💭{" "}Blog</h1>
                <p className="text-lg md:text-2xl my-6">
                    Below, you can find a collection of my personal blog posts.{" "}
                    <span className="font-bold tracking-wide">
                        Click on a title to read the full blog post.
                    </span>
                </p>
            </div>

            <div className={classNames(
                "grid grid-cols-1 md:grid-cols-2"
            )}>
                {compactBlogPosts ? compactBlogPosts.map((post) => {
                    const id = post.id;
                    const attributes = post.attributes as BlogPost;
                    const { title, description, updatedAt } = attributes;

                    return (
                        <Wrapper className={classNames(
                            "dark:bg-gray-700 rise-on-hover p-2",
                        )} key={id}>
                            {/* Title */}
                            <Link href={`blog/${id}`} passHref >
                                <h1 className={classNames(
                                    "text-xl md:text-3xl m-2",
                                    "font-bold tracking-wide text-sky-200",
                                    "hover:text-indigo-300 smooth hover:cursor-pointer"
                                )}>{title}
                                </h1>
                            </Link>

                            {/* Description */}
                            <div className="flex flex-row space-x-3 p-2 md:p-4">
                                <ChevronDoubleRightIcon className="h-6 text-lime-200" />
                                <h2 className="text-lg md:text-xl">
                                    {description}
                                </h2>
                            </div>

                            {/* Updated at */}
                            <div className="flex flex-row space-x-3 p-2 md:p-4">
                                <CalendarIcon className="h-6 text-lime-200" />
                                <h2 className="text-lg md:text-xl">
                                    {parseDate(updatedAt as string)}
                                </h2>
                            </div>
                        </Wrapper>
                    )
                }) : ""}
            </div>
        </div>
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