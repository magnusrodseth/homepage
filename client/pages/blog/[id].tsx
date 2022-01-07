import { GetStaticProps } from "next/types"
import ArticleWrapper from "../../components/article/ArticleWrapper"
import Byline from "../../components/article/Byline"
import BackLink from "../../components/BackLink"
import Markdown from "../../components/markdown/Markdown"
import { BlogPost, BlogPostEntity, BlogPostEntityResponse } from "../../generated/graphql"
import { getBlogPostByID, getBlogPostIDs } from "../../lib/api"
import classNames from "../../utils/classNames"
import { readingTime } from "../../utils/readingTime"
import { Path } from "../../utils/types"

const BlogPost = ({ attributes }: { attributes: BlogPost }) => {
    const { title, description, content, updatedAt } = attributes

    return <ArticleWrapper>
        <Byline
            lastUpdated={updatedAt as string}
            readingTimeInMinutes={readingTime(`${title}${description}`)}
        />

        <div className="px-4 w-full">
            {/* Title and subtitle */}
            <h1 className={classNames(
                "text-2xl md:text-4xl m-2",
                "font-bold tracking-wide smooth",
                "text-gray-700 dark:text-sky-200",
            )}>{title}
            </h1>

            <Markdown className="max-w-full dark:text-gray-100">
                {description}
            </Markdown>

            <div className="max-w-max m-auto">
                <BackLink href="/blog" title={"Blog"} />
            </div>
        </div>
    </ArticleWrapper >
}

export const getStaticPaths = async () => {
    const { blogPosts: { data } } = await getBlogPostIDs();

    const paths: Path[] = data.map((post: BlogPostEntity) => ({
        // Next requires the value of key 'id' to be of type string
        params: { id: (post.id as string).toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;

    if (params) {
        // We're only interested in the attributes as props for the component
        const { blogPost: { data: { attributes } } } = await getBlogPostByID(params.id as string);

        return { props: { attributes } }
    }

    return { props: { undefined } }
}

export default BlogPost
