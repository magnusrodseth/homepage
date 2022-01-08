# 👋🏼 My personal website

## Description ✏️

This website has two main purposes:

1. **A platform where I can share my projects**. A resume can only fit so much content. Wouldn't it be nice with a repository of in-depth explanations and thoughts related to previous projects?

2. **A platform where I can share my thoughts, primarily related to tech**. I often find myself wanting to write down experiences, tips and tricks, and shortcuts related to software development. This website allows for sharing that knowledge.

## Developer Information 🙋🏼‍♂️

Developed by Magnus Rødseth. The project was started early 2022, and continues to be further developed.

## Tech Stack 🛠

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MDX Bundler for Markdown content](https://github.com/kentcdodds/mdx-bundler)

## Running the application ✅

```sh
# Navgiate to the homepage directory
cd homepage

# Install dependencies
npm install

# Run application in development mode
npm run dev
```

## Adding new dynamic content

This repository uses [MDX Bundler](https://github.com/kentcdodds/mdx-bundler) for bundling Markdown content in order to display it as components in the UI.

The logic for converting `.mdx` files to useable data in React components is located in [`lib/mdx.ts`](lib/mdx.ts). See function documentation for more information.

The actual dynamic content, in the form of `.mdx` files, is located in the `content` directory. A subdirectory corresponds to a relative URL path. For instance, `content/blog/sample-blog.mdx` corresponds to the url `magnusrodseth.com/blog/sample-blog`.

Please see the [`content/template.mdx`](content/template.mdx) for a template file for the `blog` and `projects` pages.

Please note the format of this template:

- The fields (e.g. `title`, `tags`) have corresponding types (e.g `string`, `string[]` respectively).
- Some fields are optional, and are marked with a question mark (e.g. `thumbnail?: string`).

The field types and whether a field is optional is defined in the `types` directory.

This implementation supports all standard Markdown notation.

### Referencing an image in `.mdx`

An image used in a `.mdx` file must be within the `public` directory. When referencing an image, pretend that the path of the image is the `src` in a Next `<Image/>`:

```txt
![Image caption](/img/blog/image-title.png)
```

The reason this works is because of the custom MDX components defined in [`components/MdxComponents.tsx`](components/MdxComponents.tsx). This leads us right into the custom code block.

### Defining a code block in `.mdx`

A code block can be defined as you would in ordinary Markdown, defining the "language" of the code. Additionally, MDX lets you add additional props. Inspecting [`components/MdxComponents.tsx`](components/MdxComponents.tsx), we can see that the `code` allows us to also provide a code block with `lineNumbers` and a `filename`. A sample code block with all this functionality would look like this:

````txt
```js lineNumbers filename="hello.js"
const hello = () => "Hello, world!";
```
````

As with rendering images, this works because of the custom MDX components defined in [`components/MdxComponents.tsx`](components/MdxComponents.tsx).

---

> 🎉 A **huge** shoutout to [Jeff Jadulco](https://github.com/jeffjadulco/jeffjadulco.com) for implementing the .mdx solution. It helped me a great deal when creating the website.
