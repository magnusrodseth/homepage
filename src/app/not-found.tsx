import Link from "next/link";
import { Muted } from "@/components/ui/typography";
import { Icons } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p
        aria-hidden="true"
        className="animate-slide-enter text-8xl font-extrabold text-muted-foreground/20"
      >
        404
      </p>

      <h1 className="animate-slide-enter stagger-100 text-2xl font-semibold mt-4">
        Page not found
      </h1>

      <Muted className="animate-slide-enter stagger-200 mt-2 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Muted>

      <Link
        href="/"
        className="animate-slide-enter stagger-300 mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Icons.chevronLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
