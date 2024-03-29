import { env } from "@/env.mjs";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const truncate = ({
  string,
  length,
}: {
  string: string;
  length: number;
}) => {
  if (string.length <= length) return string;
  return string.slice(0, length).replace(/\s+\S*$/, "...");
};

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export const getUrl = () => {
  let url =
    env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";

  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;

  return url;
};
