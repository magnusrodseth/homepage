"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { capitalize, cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type FilterProjectsDropdownProps = {
  types: string[];
  initialType: string | null;
};

const FilterProjectsDropdown = ({
  types,
  initialType,
}: FilterProjectsDropdownProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(initialType);
  const pathname = usePathname();
  const router = useRouter();

  const handleOnClick = (type: string) => {
    setSelectedType(type);
    router.push(`${pathname}?type=${type}`);
  };

  const handleReset = () => {
    setSelectedType(null);
    router.push(pathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="secondary"
          className={cn(
            "flex justify-center items-center gap-x-2 cursor-pointer",
            "animate-slide-enter duration-300"
          )}
        >
          <Icons.chevronDown />
          {selectedType ? capitalize(selectedType) : "Filter"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {types.map((type, i) => {
          return (
            <DropdownMenuItem
              key={i}
              onClick={() => {
                handleOnClick(type);
              }}
            >
              {selectedType === type && (
                <Icons.check className="w-4 text-primary mr-1" />
              )}
              {capitalize(type)}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleReset}
          className="flex w-full justify-start items-center gap-x-2"
        >
          <Icons.close className="w-4" />
          Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterProjectsDropdown;
