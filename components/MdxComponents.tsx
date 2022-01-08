// Inspiration: https://github.com/jeffjadulco/jeffjadulco.com/blob/master/src/components/mdxComponents.tsx

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { LinkIcon } from '@heroicons/react/outline'
import HorizontalDivider from './HorizontalDivider'

type CodeProps = {
  children: any,
  lineNumbers: string,
  filename: string,
  id: string
}

export const components = {
  Image,
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
        className="md-heading text-3xl lg:text-4xl group"
      />
    )
  },
  h3: ({ ...props }) => {
    return (
      <h3
        {...props}
        data-heading
        className="md-heading text-2xl lg:text-3xl group"
      />
    )

  },
  p: ({ ...props }) => {
    return <p {...props} className="my-4" />
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
        className="border-l-2 border-gray-700 pl-2 italic dark:border-lime-200"
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
