# My personal homepage

> My little corner of the internet. A place to share my thoughts and ideas, both from projects and my career in general.

## Tech stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [`shadcn/ui`](https://ui.shadcn.com/)
- [Contentlayer](https://contentlayer.dev/)

## Running the application

```sh
# Navigate to the project directory
cd homepage

# Install dependencies
pnpm i

# Start the development server
pnpm dev
```

## How it works

[Contentlayer](https://contentlayer.dev/) is a tool that acts as an intermediary between your content (e.g. Markdown) and code, transforming content into data your code can consume. It's compatible with various systems and frameworks (preferably Next.js), allowing developers to work more efficiently with fewer bugs. Contentlayer primarily offers transformation of content into data, structuring of loose data, and defining data types, enhancing development workflows and providing type safety through TypeScript integrations.

In practice, I write a `.mdx` file inside an appropriate directory in the [`src/content`](/src/content/) directory. This Markdown gets rendered as styled HTML using the [`mdx-components.tsx`](/src/components/mdx-components.tsx) file, which contains the components used to render the Markdown. The Markdown is then transformed into data using the [`contentlayer.config.ts`](/contentlayer.config.ts) file, which defines the data types and how the Markdown should be transformed. The data is then passed to the page component, which renders the data using the components defined in [`mdx-components.tsx`](/src/components/mdx-components.tsx).
