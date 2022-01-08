import fs from 'fs'
import path from 'path'
import globby from 'globby'
import readingTime from 'reading-time'
import { bundleMDX } from 'mdx-bundler'
import rehypeSlug from 'rehype-slug'
import rehypeHeadings from 'rehype-autolink-headings'
import rehypeHighlightCode from './rehype-highlight-code'
import rehypeMetaAttribute from './rehype-meta-attribute'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import { FrontMatter } from '../types/frontmatter'


export const MDX_BLOG_PATH = 'content/blog'
export const MDX_PROJECTS_PATH = 'content/projects'

export type MDXDirectory = 'content/blog' | 'content/projects'

export const getMdxBySlug = async (slug: string, directory: MDXDirectory) => {
    return getMdxByPath(path.join(directory, `${slug}.mdx`))
}

export const getMdxByPath = async (mdxPath: string) => {
    const slug = path.basename(mdxPath).replace(path.extname(mdxPath), '')
    const source = fs.readFileSync(path.join(process.cwd(), mdxPath), 'utf8')
    const { code, frontmatter } = await bundleMDX(source, {
        xdmOptions(options) {
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeMetaAttribute,
                rehypeHighlightCode,
                rehypeAccessibleEmojis,
                rehypeSlug,
                [rehypeHeadings, { behavior: 'append' }],
            ]
            return options
        },
    })
    return {
        code,
        frontmatter: {
            ...(frontmatter as FrontMatter),
            slug,
            readingTime: readingTime(code),
        } as FrontMatter,
    }
}

export const getFrontMatters = async (directory: MDXDirectory): Promise<FrontMatter[]> => {
    const paths = await globby([`${directory}/**/*.mdx`])
    const matters = await Promise.all(
        paths.map(async filePath => {
            const source = fs.readFileSync(filePath, 'utf8')
            const { code, frontmatter } = await bundleMDX(source)

            return {
                ...(frontmatter as FrontMatter),
                slug: path.basename(filePath).replace('.mdx', ''),
                readingTime: readingTime(code, { wordsPerMinute: 300 }),
            }
        })
    )
    return matters
        .filter(Boolean)
        .filter(post => post.isPublished)
        .sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
}