"use client";

import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Button } from "./ui/button";

const BackLink = () => {
  const router = useRouter();

  return (
    <Button
      className="flex justify-center items-center gap-x-2 text-muted-foreground my-8 px-0"
      variant="link"
      size="sm"
      onClick={() => router.back()}
    >
      <Icons.chevronRight className="h-5 w-5" />
      <span className="font-mono text-lg">cd ..</span>
    </Button>
  );
};

export default BackLink;
