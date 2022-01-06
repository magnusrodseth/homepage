import React from "react";
import classNames from "../utils/classNames";

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
      className={classNames(style,
        "dark:shadow-gray-700 dark:hover:shadow-gray-800 rounded-lg shadow-md hover:shadow-lg",
        "smooth m-2 md:m-6 p-1")}
    >
      {children}
    </div>
  );
};

export default Wrapper;
