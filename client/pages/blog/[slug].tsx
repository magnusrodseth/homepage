import { GetStaticPaths, GetStaticProps } from "next/types"
import { useMemo } from "react"
import ArticleWrapper from "../../components/article/ArticleWrapper"
import Byline from "../../components/article/Byline"
import BackLink from "../../components/BackLink"
import Markdown from "../../components/markdown/Markdown"
import { getFrontMatters, getMdxBySlug, MDX_BLOG_PATH } from "../../lib/mdx"
import { Article } from "../../types/article"
import { parseISO } from 'date-fns'
import { getMDXComponent } from 'mdx-bundler/client'
import classNames from "../../utils/classNames"
import { components } from "../../components/MdxComponents"

const BlogPost = ({ post: { code, frontmatter } }: { post: Article }) => {

    console.log(code)

    const Component: any = useMemo(() => getMDXComponent(code), [code])

    const publishedAt = parseISO(frontmatter.publishedAt)
    const updatedAt = frontmatter.updatedAt
        ? parseISO(frontmatter.updatedAt)
        : undefined

    return <ArticleWrapper>
        <Byline
            publishedAt={publishedAt}
            updatedAt={updatedAt}
            readingTimeInMinutes={frontmatter.readingTime?.minutes as number}
        />

        <div className="px-4 w-full">
            {/* Title and subtitle */}
            <h1 className={classNames(
                "text-2xl md:text-4xl m-2",
                "font-bold tracking-wide smooth",
                "text-gray-700 dark:text-sky-200",
            )}>{frontmatter.title}
            </h1>

            <Component components={components} />

            <div className="max-w-max m-auto">
                <BackLink href="/blog" title={"Blog"} />
            </div>
        </div>
    </ArticleWrapper >
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
