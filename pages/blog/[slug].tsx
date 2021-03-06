import { GetStaticPaths, GetStaticProps } from "next/types"
import { Article } from "../../src/types/article"
import ArticleComponent from "../../src/components/article/ArticleComponent"
import { getFrontMatters, getMdxBySlug, MDX_BLOG_PATH } from "../../src/lib/mdx"
import NoContent from "../../src/components/NoContent"

const BlogPost = ({ post }: { post: Article }) => {
    return post ? <ArticleComponent article={post} backTo="blog" /> : <NoContent />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getFrontMatters(MDX_BLOG_PATH)

    return {
        paths: posts.map(post => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { code, frontmatter } = await getMdxBySlug(context?.params?.slug as string, MDX_BLOG_PATH)

    return {
        props: {
            post: {
                code,
                frontmatter,
            } as Article,
        },
    }
}

export default BlogPost
