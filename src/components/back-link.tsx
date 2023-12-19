"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Button } from "./ui/button";

const BackLink = () => {
  const router = useRouter();
  const pathname = usePathname();
  const childPage = pathname.split("/")[1] ?? undefined;

  return (
    <Button
      className="flex justify-center items-center gap-x-2 text-muted-foreground my-8 px-0 animate-slide-enter"
      variant="link"
      size="sm"
      onClick={() => {
        if (childPage) {
          router.push(`/${childPage}`);
        } else {
          router.push("/");
        }
      }}
    >
      <Icons.chevronRight className="h-5 w-5" />
      <span className="font-mono text-lg">cd ..</span>
    </Button>
  );
};

export default BackLink;
