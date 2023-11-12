"use client";
import Typewriter from "typewriter-effect";

const Logo = () => {
  return (
    <div className="font-mono text-2xl">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("~/magnusrodseth").start();
        }}
        options={{
          cursor: "_",
          delay: 100,
        }}
      />
    </div>
  );
};

export default Logo;
