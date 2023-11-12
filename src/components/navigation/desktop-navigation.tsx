import NavigationLink from "./navigation-link";
import { ModeToggle } from "../mode-toggle";
import { navigation } from "@/config/navigation";

const DesktopNavigation = () => {
  return (
    <div className="hidden lg:flex justify-end items-center space-x-4">
      {navigation.map((item, index) => (
        <NavigationLink key={index} item={item} />
      ))}

      <ModeToggle />
    </div>
  );
};

export default DesktopNavigation;
