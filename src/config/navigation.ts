import { NavItem } from "../types";
import { navPages, pageHref } from "@/config/pages";

export const navigation: NavItem[] = navPages.map((page) => ({
  title: page.title,
  href: pageHref(page),
}));
