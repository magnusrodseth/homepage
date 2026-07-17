"use client";

import Image, { StaticImageData } from "next/image";
import * as Dialog from "@radix-ui/react-dialog";

type ProfileImageProps = {
  src: StaticImageData;
  alt: string;
};

export function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="animate-slide-enter overflow-hidden rounded-2xl w-full aspect-square cursor-pointer shadow-xl shadow-indigo-500/10 ring-1 ring-white/10"
          aria-label={`View ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            placeholder="blur"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, 280px"
            priority
          />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 focus:outline-hidden">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close image"
              className="w-[min(90vw,90vh)] aspect-square overflow-hidden rounded-2xl cursor-zoom-out"
            >
              <Image
                src={src}
                alt={alt}
                placeholder="blur"
                className="object-cover w-full h-full"
                sizes="90vw"
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
