/**
 * The fields in the FrontMatter type corresponds to the required and optional fields in a .mdx file.
 * The .mdx files are located in the content directory.
 */
export type FrontMatter = {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  toc?: boolean
  isPublished: boolean
  seoImage?: string
  thumbnail?: string
  slug: string
  readingTime?: { text: string; minutes: number; time: number; words: number }
}
