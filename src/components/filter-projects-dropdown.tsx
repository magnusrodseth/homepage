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
import { capitalize } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type FilterProjectsDropdownProps = {
  types: string[];
};

const FilterProjectsDropdown = ({ types }: FilterProjectsDropdownProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleOnClick = (type: string) => {
    router.push(`${pathname}?type=${type}`);
  };

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="secondary"
          className="flex justify-center items-center gap-x-2 cursor-pointer"
        >
          <Icons.chevronDown />
          Filter
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
