"use client";

import { Icons } from "./icons";

const BackToTop = () => {
  const handleBackToTop = () => {
    if (window) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={handleBackToTop}
      className="animate-slide-enter cursor-pointer flex justify-start items-center gap-x-2 text-muted-foreground hover:text-foreground transition-all duration-150 text-sm"
    >
      <Icons.chevronUp className="w-4" />
      <span>Back to top</span>
    </div>
  );
};

export default BackToTop;
