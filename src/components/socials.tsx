import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "./icons";

const Socials = () => {
  return (
    <div className="flex justify-center items-center gap-x-4">
      <Link
        href={siteConfig.github}
        aria-label="GitHub link"
        target="_blank"
        className="hover-rise text-muted-foreground hover:text-foreground duration-150"
      >
        <Icons.gitHub className="h-5 w-5" />
      </Link>

      <Link
        href={siteConfig.linkedIn}
        aria-label="LinkedIn link"
        target="_blank"
        className="hover-rise text-muted-foreground hover:text-foreground duration-150"
      >
        <Icons.linkedIn className="h-5 w-5" />
      </Link>

      <Link
        href={siteConfig.email}
        aria-label="LinkedIn link"
        target="_blank"
        className="hover-rise text-muted-foreground hover:text-foreground duration-150"
      >
        <Icons.send className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default Socials;
