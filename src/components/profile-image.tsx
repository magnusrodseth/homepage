"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

type ProfileImageProps = {
  src: StaticImageData;
  alt: string;
};

export function ProfileImage({ src, alt }: ProfileImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const open = useCallback(() => {
    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsOpen(true));
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setIsMounted(false), 200);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMounted, close]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="animate-slide-enter overflow-hidden rounded-2xl w-full aspect-square cursor-pointer shadow-xl shadow-indigo-500/10 ring-1 ring-white/10"
        aria-label={`View ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          placeholder="blur"
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 280px"
        />
      </button>

      {isMounted && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center cursor-pointer",
            "bg-black/80 transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div
            className={cn(
              "w-[min(90vw,90vh)] aspect-square overflow-hidden rounded-2xl",
              "transition-transform duration-200",
              isOpen ? "scale-100" : "scale-95"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              placeholder="blur"
              className="object-cover w-full h-full"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
