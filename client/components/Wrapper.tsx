import React from "react";

interface WrapperProps {
  children: any;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  className,
  children,
}: WrapperProps) => {
  const style = className !== undefined ? className : "";

  return (
    <div
      className={`${style} rounded-lg shadow-md hover:shadow-lg 
      smooth m-2 p-2`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
