import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "./icons";

const SOCIAL_LINKS = [
  { href: siteConfig.linkedIn, label: "LinkedIn", icon: Icons.linkedIn },
  { href: siteConfig.email, label: "Email", icon: Icons.mail },
  { href: siteConfig.github, label: "GitHub", icon: Icons.gitHub },
];

const Socials = () => {
  return (
    <div className="flex justify-center items-center gap-x-4">
      {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-rise text-muted-foreground hover:text-primary duration-150"
        >
          <Icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
