"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Button } from "./ui/button";

const BackLink = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((s) => s.length > 0);
  const parentPath = pathSegments.length > 1 
    ? `/${pathSegments.slice(0, -1).join("/")}` 
    : "/";

  return (
    <Button
      className="flex justify-center items-center gap-x-2 text-muted-foreground my-8 px-0 animate-slide-enter"
      variant="link"
      size="sm"
      onClick={() => router.push(parentPath)}
    >
      <Icons.chevronRight className="h-5 w-5" />
      <span className="font-mono text-lg">cd ..</span>
    </Button>
  );
};

export default BackLink;
