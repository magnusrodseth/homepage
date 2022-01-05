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
      smooth m-2 md:m-6 p-1`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
