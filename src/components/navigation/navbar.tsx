import Link from "next/link";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  return (
    <div className={cn("w-full py-2 shadow-sm")}>
      <header className="container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <Link
            className={cn(
              "flex justify-center items-center space-x-2",
              "hover:translate-x-1 duration-300 transition-all"
            )}
            href="/"
          >
            <div className="flex flex-col justify-center items-start">
              <span className="font-bold text-4xl">{siteConfig.name}</span>
              <span className="text-xs w-[20ch] font-mono">MR</span>
            </div>
          </Link>

          <div>
            <DesktopNavigation />
            <MobileNavigation />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
