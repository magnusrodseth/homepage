"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type ExpandableTextProps = {
  text: string;
  className?: string;
  clampLines?: number;
};

export function ExpandableText({
  text,
  className,
  clampLines = 2,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  return (
    <div className="flex flex-col gap-1">
      <small
        ref={textRef}
        className={cn(
          "text-sm font-medium leading-relaxed",
          !isExpanded && clampLines === 2 && "line-clamp-2",
          !isExpanded && clampLines === 3 && "line-clamp-3",
          className
        )}
      >
        {text}
      </small>
      {isTruncated && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors self-start"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
