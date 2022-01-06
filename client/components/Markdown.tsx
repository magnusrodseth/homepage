import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic, materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remark from "remark";
import { default as stripMarkdown } from "strip-markdown";
import { useDarkMode } from "../hooks/useDarkMode";
import classNames from "../utils/classNames";
import { ThemeContext } from "../utils/theme/ThemeContext";
import LinkRenderer from "./markdown/LinkRenderer";

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

  const [isDark, _] = useDarkMode();

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
        </code>
      );
    },

    // Custom renderer for anchor tags
    a: LinkRenderer
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
        "prose-h1:text-gray-700 dark:prose-h1:text-indigo-200 prose-h1:tracking-wide",
        "prose-h2:text-gray-700 dark:prose-h2:text-indigo-200 prose-h2:tracking-wide",
        "prose-h3:text-gray-700 dark:prose-h3:text-indigo-200 prose-h3:tracking-wide",
        "prose-h4:text-gray-700 dark:prose-h4:text-indigo-200 prose-h4:tracking-wide",
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

