import NavigationLink from "./navigation-link";
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
    </div>
  );
};

export default DesktopNavigation;
