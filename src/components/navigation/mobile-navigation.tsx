"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Socials from "../socials";
import { ThemeToggle } from "../theme-toggle";

/**
 * The menu below `md`: a button that morphs into a close icon, over a
 * full-screen panel whose links rise in one after another.
 *
 * It is a disclosure, not a dialog: the button keeps `aria-expanded` and stays
 * on top of the panel, so it is both the way in and the way out. While open,
 * everything outside the menu is `inert` (no focus, no clicks, hidden from
 * screen readers) and the page does not scroll. Escape closes it and returns
 * focus to the button. Reduced motion is handled globally in `globals.css`.
 */
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setIsOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen || !rootRef.current) return;

    // Make every element outside the menu inert: the siblings of each
    // ancestor, from the menu up to <body>.
    const inerted: HTMLElement[] = [];
    for (
      let node: HTMLElement | null = rootRef.current;
      node && node !== document.body;
      node = node.parentElement
    ) {
      for (const sibling of Array.from(node.parentElement?.children ?? [])) {
        // Next's route announcer is a live region and must keep announcing.
        if (
          sibling !== node &&
          sibling instanceof HTMLElement &&
          !sibling.inert &&
          sibling.tagName !== "SCRIPT" &&
          sibling.tagName !== "NEXT-ROUTE-ANNOUNCER"
        ) {
          sibling.inert = true;
          inerted.push(sibling);
        }
      }
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    // Rotating a phone or widening the window past `md` hides this menu.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      for (const el of inerted) el.inert = false;
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isOpen, close]);

  return (
    <div ref={rootRef} className="flex md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "relative z-50 -mr-2 grid size-10 place-items-center rounded-md",
          "text-foreground transition-colors hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <span aria-hidden="true" className="relative block h-3.5 w-5">
          <span
            className={cn(
              "absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current",
              "transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
              isOpen && "translate-y-[6.25px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 right-0 h-[1.5px] rounded-full bg-current",
              "transition-[transform,width] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
              isOpen ? "w-full -translate-y-[6.25px] -rotate-45" : "w-3",
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background/90 backdrop-blur-xl",
          "px-6 pb-10 pt-28",
          "transition-[opacity,visibility] duration-300 ease-out",
          isOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1">
          {navigation.map((item, index) => {
            const active = pathname.startsWith(item.href);
            const external = item.href.startsWith("http");
            return (
              <li
                key={item.href}
                className={cn(
                  "transition-[opacity,translate] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen
                    ? "translate-y-0 opacity-100 duration-500"
                    : "translate-y-3 opacity-0 duration-150",
                )}
                style={{
                  transitionDelay: isOpen ? `${80 + index * 60}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => close(false)}
                  className={cn(
                    "group flex items-baseline gap-4 rounded-md py-2",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  <span className="w-6 font-mono text-xs tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-3xl font-semibold tracking-tight transition-[color,translate] duration-300",
                      "group-hover:translate-x-1 group-focus-visible:translate-x-1",
                      active
                        ? "text-primary"
                        : "text-foreground/80 group-hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </span>
                  {external && (
                    <>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 self-center text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 self-center rounded-full bg-primary"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className={cn(
            "mt-auto flex items-center justify-between border-t border-border pt-6",
            "transition-[opacity,translate] ease-out",
            isOpen
              ? "translate-y-0 opacity-100 duration-500"
              : "translate-y-2 opacity-0 duration-150",
          )}
          style={{
            transitionDelay: isOpen
              ? `${120 + navigation.length * 60}ms`
              : "0ms",
          }}
        >
          <Socials />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
