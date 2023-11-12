import NavigationLink from "./navigation-link";
import { ModeToggle } from "../mode-toggle";
import { navigation } from "@/config/navigation";
import { Separator } from "../ui/separator";
import Socials from "../socials";

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex justify-end items-center space-x-4">
      {navigation.map((item, index) => (
        <NavigationLink key={index} item={item} />
      ))}

      <Separator orientation="vertical" className="h-6" />

      <Socials />

      <Separator orientation="vertical" className="h-6" />

      <ModeToggle />
    </div>
  );
};

export default DesktopNavigation;
