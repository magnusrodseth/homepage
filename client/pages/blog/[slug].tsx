import { GetStaticPaths, GetStaticProps } from "next/types"
import { Article } from "../../types/article"
import ArticleComponent from "../../components/article/ArticleComponent"
import { getFrontMatters, getMdxBySlug, MDX_BLOG_PATH } from "../../lib/mdx"

const BlogPost = ({ post }: { post: Article }) => {
    return <ArticleComponent article={post} backTo="blog" />
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
