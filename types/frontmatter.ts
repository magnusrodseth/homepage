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
