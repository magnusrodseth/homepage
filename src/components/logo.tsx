import { Signature } from "@/components/signature";

const Logo = () => {
  return (
    <Signature
      name="initials"
      className="h-7 w-auto text-foreground/75"
      duration={1}
      delay={0.2}
      strokeWidth={38}
    />
  );
};

export default Logo;
