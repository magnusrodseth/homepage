import Socials from "@/components/socials";
import { H2, Muted } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import IndexContent from "@/content/pages/index.mdx";
import profilePicture from "../../public/profile-picture.jpg";
import { ProfileImage } from "@/components/profile-image";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <H2
          className={cn(
            "animate-slide-enter uppercase text-4xl font-extrabold tracking-tight",
            "bg-linear-to-r from-indigo-100 to-indigo-400 text-transparent bg-clip-text"
          )}
        >
          {siteConfig.name}
        </H2>

        <ProfileImage
          src={profilePicture}
          alt={`Profile picture of ${siteConfig.name}`}
        />
      </div>

      <div className="mt-4 mdx">
        <IndexContent />
      </div>

      <div className="flex justify-start items-center gap-x-4 py-8 animate-slide-enter delay-400">
        <Muted>
          <span className="font-semibold">Psst.</span> You can reach me on
        </Muted>
        <Socials />
      </div>
    </div>
  );
}
