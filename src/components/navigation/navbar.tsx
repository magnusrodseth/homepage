import Link from "next/link";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Logo from "../logo";

const Navbar = async () => {
  return (
    <div className={cn("w-full py-2")}>
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
              <Logo />
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
