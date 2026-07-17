"use client";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

const NavigationLink = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(item.href);

  const isExternalLink = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: "link", size: "sm" }),
        active
          ? "text-primary underline underline-offset-4"
          : "text-muted-foreground hover:text-primary"
      )}
    >
      {item.title}
    </Link>
  );
};
export default NavigationLink;
