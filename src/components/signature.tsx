import { cn } from "@/lib/utils";
import { SIGNATURES, type SignatureName } from "@/lib/signature.generated";

type SignatureProps = {
  name: SignatureName;
  className?: string;
  /** Seconds the whole signature takes to write. */
  duration?: number;
  /** Seconds before the pen touches down. */
  delay?: number;
  /** Pen width in viewBox units (a lowercase letter is about 350 units tall). */
  strokeWidth?: number;
};

/**
 * A name written by hand: each pen stroke draws in turn, at a speed that keeps
 * the ink moving at one pace. Pure CSS, so it runs on the server-rendered
 * markup with no hydration. The ink takes `currentColor`.
 *
 * The SVG is decorative; give the surrounding element the name as text.
 */
export function Signature({
  name,
  className,
  duration = 2.4,
  delay = 0,
  strokeWidth = 30,
}: SignatureProps) {
  const { viewBox, strokes } = SIGNATURES[name];

  return (
    <svg
      viewBox={viewBox}
      className={cn("signature", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {strokes.map((stroke, i) => (
        <path
          key={i}
          d={stroke.d}
          pathLength={1}
          style={{
            animationDelay: `${(delay + stroke.start * duration).toFixed(3)}s`,
            animationDuration: `${(stroke.share * duration).toFixed(3)}s`,
          }}
        />
      ))}
    </svg>
  );
}
