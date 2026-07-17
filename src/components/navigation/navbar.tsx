import Link from "next/link";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import { cn } from "@/lib/utils";
import Logo from "../logo";

const Navbar = () => {
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
            aria-label="Magnus Rødseth, home"
          >
            <div className="flex flex-col justify-center items-start">
              <Logo />
            </div>
          </Link>

          <nav aria-label="Primary">
            <DesktopNavigation />
            <MobileNavigation />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
