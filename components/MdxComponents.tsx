import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { LinkIcon } from '@heroicons/react/outline'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { materialOceanic, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useDarkMode } from '../hooks/useDarkMode'

type CodeProps = {
  children: any,
  showLineNumbers: string,
  fileName: string,
  id: string
}

export const components = {
  Image,
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return (
        <a
          {...props}
          className="md-link"
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

  // Code block
  code: ({ children, node, showLineNumbers, fileName, className, inline, id, ...props }: any) => {
    const [isDark, _] = useDarkMode();
    const match = /language-(\w+)/.exec(className || "");

    return (
      <div>
        {fileName && <div className="w-full code-filename">{fileName}</div>}
        {!inline && match ? (
          <SyntaxHighlighter
            style={isDark ? materialOceanic : materialLight}
            customStyle={{ overflow: "hidden" }}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>)}
      </div>
    )
  },

  em: ({ ...props }) => {
    return <em {...props} className="italic" />
  },
  hr: ({ ...props }) => {
    return <hr {...props} className="my-10 border-accent" />
  },
  blockquote: ({ ...props }) => {
    return (
      <blockquote
        {...props}
        className="px-5 py-2 my-6 text-base border-l-2 lg:-ml-6 bg-back-secondary border-accent"
      />
    )
  },
  ul: (props: any) => (
    <ul className="mb-4 leading-relaxed list-disc list-inside" {...props} />
  ),
  ol: (props: any) => (
    <ol className="pl-4 my-6 leading-7 list-decimal" {...props} />
  ),
  li: (props: any) => <li className="mt-3" {...props} />,
  CodeLink: ({ id, index, href, children, ...props }: any) => {
    const isExternal = href.startsWith('http')
    React.useEffect(() => {
      const codeblock = document.getElementById(id)
      if (!codeblock) return

      const allHighlightWords = codeblock.querySelectorAll('.highlight-word')
      const target = allHighlightWords[index - 1]
      if (!target) return

      target.replaceWith(
        Object.assign(document.createElement('a'), {
          href,
          innerHTML: target.innerHTML,
          className: target.className,
          ...(isExternal ? { target: '_blank', rel: 'noopener' } : {}),
        })
      )
    }, [])

    return null
  },
}
