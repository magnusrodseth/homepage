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
export const MDX_PROJECTS_PATH = 'content/prjects'

type MDXDirectoryPath = 'content/blog' | 'content/prjects'

/**
 * Gets .mdx content based on provided slug.
 * @param slug is the slug for the .mdx content. This corresponds to the filename of a given .mdx file. For instance, for a file 'hello-word.mdx', the slug would be 'hello-world'.
 * @param directory is the path of the directory containing the .mdx file. For instance: 'content/blog'
 * @returns a Promise with the .mdx content.
 */
export const getMdxBySlug = async (slug: string, directory: MDXDirectoryPath) => getMdxByPath(path.join(directory, `${slug}.mdx`))

/**
 * Gets .mdx content based on a full path.
 * @param mdxPath is the path to the .mdx content
 * @returns a Promise with the .mdx content.
 */
export const getMdxByPath = async (mdxPath: string) => {
  const slug = path.basename(mdxPath).replace(path.extname(mdxPath), '')

  const source = fs.readFileSync(path.join(process.cwd(), mdxPath), 'utf8')

  // Bundle the .mdx content
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

/**
 * Gets front matters for a given directory of articles.
 * @param directory is the directory where the articles reside.
 * @returns front matters that are published, in order such that new articles appear first
 */
export const getFrontMatters = async (directory: MDXDirectoryPath): Promise<FrontMatter[]> => {
  const paths = await globby([`${directory}/**/*.mdx`])

  const frontmatters = await Promise.all(
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



  return frontmatters
    .filter(Boolean)
    // Only use published articles
    .filter(post => post.isPublished)
    // Sort articles by date, such that new articles appear first
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}