"use client";

import { navigation } from "@/config/navigation";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import NavigationLink from "./navigation-link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode-toggle";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Ensure the sheet is closed when the route changes
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex lg:hidden">
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Icons.menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="mt-16 flex flex-col items-center justify-center space-y-8">
            {navigation.map((item, index) => (
              <NavigationLink key={index} item={item} />
            ))}

            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
