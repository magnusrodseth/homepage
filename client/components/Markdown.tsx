import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
          style={atomDark}
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
      className={classNames("markdown", styles)}
    >
      {text}
    </ReactMarkdown>
  );
};

export default Markdown;
