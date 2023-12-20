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
      className={cn(
        active
          ? buttonVariants({ variant: "secondary", size: "sm" })
          : buttonVariants({ variant: "link", size: "sm" })
      )}
    >
      {item.title}
    </Link>
  );
};
export default NavigationLink;
