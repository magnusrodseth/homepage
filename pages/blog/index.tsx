import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import PageWrapper from "../../components/PageWrapper";
import Wrapper from "../../components/Wrapper";
import classNames from "../../utils/classNames";
import Heading from "../../components/Heading";
import { GetStaticProps } from "next";
import { FrontMatter } from "../../types/frontmatter";
import { getFrontMatters, MDX_BLOG_PATH } from "../../lib/mdx";
import NoContent from "../../components/NoContent";

const BlogIndex = ({ posts }: { posts: FrontMatter[] }) => {
    return (
        <PageWrapper>
            <div className="text-center mx-4">
                <h1 className={classNames(
                    "smooth m-auto text-4xl md:text-6xl my-6 font-mono tracking-tight font-bold",
                    "text-indigo-400 dark:text-indigo-300"
                )}>
                    💭{" "}Blog
                </h1>
            </div>

            {!posts || posts.length == 0
                ? <NoContent />
                : <div className={classNames(
                    "grid grid-cols-1 md:grid-cols-2"
                )}>
                    {posts.map((post, index) => {
                        return (
                            <Wrapper className={classNames(
                                "hover:cursor bg-sky-50 dark:bg-gray-700 rise-on-hover p-2"
                            )} key={index}>
                                {/* Title */}
                                <Link href={`blog/${post.slug}`} passHref>
                                    <a>
                                        <h1 className={classNames(
                                            "text-xl md:text-3xl m-2 smooth",
                                            "font-bold tracking-wide smooth",
                                            "text-gray-700 dark:text-sky-200",
                                            "dark:hover:text-indigo-300 hover:text-black"
                                        )}>{post.title}
                                        </h1>
                                    </a>
                                </Link>

                                {/* Description */}
                                <Link href={`blog/${post.slug}`} passHref>
                                    <a className="flex flex-row space-x-3 p-2 md:p-4">
                                        <ChevronDoubleRightIcon className="icon text-indigo-600 dark:text-lime-200" />
                                        <h2 className="text-lg md:text-xl mt-0.5">
                                            {post.description}
                                        </h2>
                                    </a>
                                </Link>
                            </Wrapper>
                        );
                    })}
                </div>}
        </PageWrapper >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getFrontMatters(MDX_BLOG_PATH)
    return { props: { posts } }
}

export default BlogIndex

