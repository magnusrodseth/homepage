// Inspiration: https://github.com/jeffjadulco/jeffjadulco.com/blob/master/src/components/mdxComponents.tsx

import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { LinkIcon } from '@heroicons/react/outline'
import HorizontalDivider from './HorizontalDivider'

type CodeProps = {
  children: any,
  lineNumbers: string,
  filename: string,
  id: string
}

type ImageProps = {
  src: string;
  caption?: string;
}

export const components = {
  Image: ({ src, caption, ...props }: ImageProps) => {
    return (
      <div className="w-full mt-2 mb-4">
        <img {...props} className="my-4 m-auto max-h-[75vh]" src={src} />
        {caption ? <span className="italic block text-center">{caption}</span> : null}
      </div>
    )
  },
  img: ({ ...props }) => {
    return <img {...props} className="my-4 max-h-[75vh]" />
  },
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return (
        <a
          {...props}
          className="md-link smooth"
          href={href}
          target="_blank"
          rel="noreferrer"
        />
      )
    }

    if (href.startsWith('#')) {
      return (
        <a
          {...props}
          href={href}
          className={classNames(
            "ml-2 smooth scale-0 opacity-0 md-link group-hover:scale-100 group-hover:opacity-100"
          )}
        >
          <LinkIcon className="w-5" />
        </a>
      )
    }

    return (
      <Link href={href}>
        <a
          {...props}
          className="md-link"
        />
      </Link>
    )
  },
  strong: ({ ...props }) => <strong {...props} className="font-bold" />,
  h2: ({ ...props }) => {
    return (
      <h2
        {...props}
        data-heading
        className="md-heading text-xl lg:text-2xl group"
      />
    )
  },
  h3: ({ ...props }) => {
    return (
      <h3
        {...props}
        data-heading
        className="md-heading text-lg lg:text-xl group"
      />
    )

  },
  h4: ({ ...props }) => {
    return (
      <h4
        {...props}
        data-heading
        className="md-heading text-md lg:text-lg group"
      />
    )

  },
  p: ({ ...props }) => {
    return <p {...props} className="mb-4" />
  },

  code: ({ children, lineNumbers, filename, id }: CodeProps) => {
    return (
      <>
        {filename && <div className="w-full code-filename">{filename}</div>}
        <code
          className={classNames('smooth', {
            'line-numbers': lineNumbers !== undefined,
          })}
          id={id}
        >
          {children}
        </code>
      </>
    )
  },

  em: ({ ...props }) => {
    return <em {...props} className="italic" />
  },
  hr: ({ ...props }) => {
    return <HorizontalDivider {...props} />
  },
  blockquote: ({ ...props }) => {
    return (
      <blockquote
        {...props}
        className="border-l-2 border-indigo-400 my-4 pl-2 italic dark:border-lime-200"
      />
    )
  },
  ul: (props: any) => (
    <ul className="list-disc my-2 list-inside" {...props} />
  ),
  ol: (props: any) => (
    <ol className="pl-4 my-2 list-decimal" {...props} />
  ),
  li: (props: any) => <li className="my-1" {...props} />,
}
