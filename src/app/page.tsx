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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 items-center">
        <div className="order-2 sm:order-1 flex flex-col justify-center">
          <p className="animate-slide-enter text-lg text-muted-foreground mb-1">
            Nice to meet you, I&apos;m
          </p>
          <H2
            className={cn(
              "animate-slide-enter delay-100 uppercase text-4xl sm:text-5xl font-extrabold tracking-tight",
              "bg-linear-to-r from-indigo-100 to-indigo-400 text-transparent bg-clip-text"
            )}
          >
            {siteConfig.name}
          </H2>
        </div>

        <div className="order-1 sm:order-2 w-full max-w-[280px] sm:max-w-none mx-auto sm:mx-0">
          <ProfileImage
            src={profilePicture}
            alt={`Profile picture of ${siteConfig.name}`}
          />
        </div>
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
