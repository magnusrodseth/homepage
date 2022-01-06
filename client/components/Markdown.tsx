import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic, duotoneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remark from "remark";
import { default as stripMarkdown } from "strip-markdown";
import classNames from "../utils/classNames";

interface MarkdownProps {
  className?: string;
  children: any;
  strip?: boolean;
}

const Markdown: React.FC<MarkdownProps> = ({
  className,
  children,
  strip,
}: MarkdownProps) => {
  const styles = className ? className : "";

  if (strip) {
    let result;
    remark()
      .use(stripMarkdown)
      .process(children, (_, file) => (result = file.contents));
    return <p className={className}>{result}</p>;
  }

  // Use react-syntax-highlighter for code blocks
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          // TODO: Check for dark or light mode, and then set theme
          // Light mode: duotoneLight
          // Dark mode: materialOceanic
          style={materialOceanic}
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
        </code>
      );
    },
  };

  // Slice away underlined text, as Strapi does not work properly
  let text = "";

  if (typeof children === "string") {
    text = children.replace("<u>", "");
    text = text.replace("</u>", "");
  }

  return (
    <ReactMarkdown
      components={components}
      className={classNames("max-w-full prose prose-md md:prose-lg dark:prose-invert smooth",
        // headings
        "prose-h1:text-gray-700 dark:prose-h1:text-indigo-200",
        "prose-h2:text-gray-700 dark:prose-h2:text-indigo-200",
        "prose-h3:text-gray-700 dark:prose-h3:text-indigo-200",
        "prose-h4:text-gray-700 dark:prose-h4:text-indigo-200",
        // <a>
        "dark:prose-a:text-indigo-300 dark:hover:prose-a:text-indigo-400",
        "prose-a:text-indigo-700 hover:prose-a:text-indigo-900",
        styles)}
    >
      {text}
    </ReactMarkdown>
  );
};

export default Markdown;

