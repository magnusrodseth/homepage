import { cn } from "@/lib/utils";
import Link from "next/link";
import Socials from "./socials";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()}.{" "}
            <Link
              href="https://magnusrodseth.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Magnus Rødseth
            </Link>
            . All Rights Reserved.
          </p>
        </div>

        <Socials />
      </div>
    </footer>
  );
}
