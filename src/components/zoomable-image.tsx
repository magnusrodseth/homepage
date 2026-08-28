"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

type ZoomableImageProps = {
  src: string;
  alt: string;
  /** Intrinsic size, stamped onto the image at build time by remark-image-size. */
  width?: number;
  height?: number;
  className?: string;
};

const FALLBACK_WIDTH = 1600;
const FALLBACK_HEIGHT = 900;

/**
 * A figure image that opens full-screen on click and closes on Escape,
 * a backdrop click, or the close button.
 *
 * The overlay is portaled to <body> so it escapes the article's stacking and
 * `overflow` contexts; without that a zoomed diagram would be clipped by the
 * prose column.
 */
export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const intrinsicWidth = width ?? FALLBACK_WIDTH;
  const intrinsicHeight = height ?? FALLBACK_HEIGHT;

  useEffect(() => setIsMounted(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the thumbnail the reader opened, so keyboard and screen
    // reader users land back where they were instead of at the top of the page.
    openerRef.current?.focus();
  }, []);

  const open = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    openerRef.current = event.currentTarget as HTMLElement;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      // Only the close button is focusable inside the overlay, so trapping the
      // Tab cycle is a matter of keeping focus on it.
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close]);

  const thumbnail = (
    <Image
      src={src}
      alt={alt}
      width={intrinsicWidth}
      height={intrinsicHeight}
      sizes="(min-width: 768px) 42rem, 100vw"
      className={cn(
        "h-auto w-full rounded-lg shadow-md",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "group-hover:-translate-y-0.5 group-hover:shadow-lg",
        className
      )}
    />
  );

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={alt ? `Enlarge image: ${alt}` : "Enlarge image"}
        aria-haspopup="dialog"
        className={cn(
          "group relative block w-full cursor-zoom-in appearance-none bg-transparent p-0",
          "rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        )}
      >
        {thumbnail}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-2 top-2 rounded-md bg-background/80 p-1.5",
            "text-muted-foreground opacity-0 shadow-sm backdrop-blur-sm",
            "transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        >
          <Icons.maximize className="h-4 w-4" />
        </span>
      </button>

      {isMounted &&
        isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt || "Enlarged image"}
            onClick={close}
            className={cn(
              "fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8",
              "bg-background/90 backdrop-blur-sm",
              "animate-lightbox-backdrop cursor-zoom-out"
            )}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close image (Escape)"
              className={cn(
                "absolute right-4 top-4 rounded-md border border-border/60 bg-background/80 p-2",
                "text-muted-foreground shadow-sm backdrop-blur-sm transition-colors",
                "hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              )}
            >
              <Icons.close className="h-5 w-5" />
            </button>

            <figure
              // The image itself is not a dismiss target, so a reader can
              // pan/inspect it without the overlay closing under the cursor.
              onClick={(event) => event.stopPropagation()}
              className="animate-lightbox-panel flex max-h-full cursor-default flex-col items-center gap-4"
            >
              <Image
                src={src}
                alt={alt}
                width={intrinsicWidth}
                height={intrinsicHeight}
                sizes="100vw"
                priority
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              {alt && (
                <figcaption className="max-w-2xl text-center text-sm text-muted-foreground">
                  {alt}
                </figcaption>
              )}
            </figure>
          </div>,
          document.body
        )}
    </>
  );
}
