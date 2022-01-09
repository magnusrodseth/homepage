import PageWrapper from "../../components/PageWrapper";
import classNames from "../../utils/classNames";
import { GetStaticProps } from "next";
import { FrontMatter } from "../../types/frontmatter";
import { getFrontMatters, MDX_BLOG_PATH } from "../../lib/mdx";
import ArticleCards from "../../components/article/ArticleCards";

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

            <ArticleCards articles={posts} />
        </PageWrapper >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getFrontMatters(MDX_BLOG_PATH)
    return { props: { posts } }
}

export default BlogIndex

