import Image from "next/image"
import classNames from "../utils/classNames"
import Typewriter from 'typewriter-effect';
import LinkButton from "../components/LinkButton";

const Index = () => {
  const typewriterStrings = ['fundamentally curious.', 'an engineer at heart.', 'eager to challenge myself.'];

  return (
    // Jumbotron
    <div className="flex justify-center items-center">
      <div className="smooth bg-gradient-to-b mt-16 from-sky-200 to-indigo-400 w-screen">
        <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">

          {/* Memoji Logo */}
          <div>
            <Image src="/img/logo.png" alt="Momoji Logo" width="400" height="400" />
          </div>

          {/* Middle part of Jumbotron with description */}
          <h2 className="text-3xl tracking-wide text-gray-900 sm:text-4xl">
            <span className="block text-md my-4 font-bold tracking-wide">
              Hello, my name is Magnus Rødseth.
            </span>
            <span className="block text-xl my-4 tracking-wide">
              I&apos;m a software developer based in Norway, currently studying Computer Science at NTNU.
            </span>

            {/* Typewriter */}
            <div className="flex flex-row my-2 text-2xl">
              <span className="tracking-wide mr-4">
                I&apos;m{" "}
              </span>
              <span className="font-mono mt-[1px] font-bold">
                <Typewriter
                  options={{
                    strings: typewriterStrings,
                    autoStart: true,
                    loop: true,
                    delay: 35,
                    deleteSpeed: 35,
                  }}
                />
              </span>
            </div>

            {/* Bottom part of jumbotron */}
            <span className="block text-sky-100 font-extrabold">
              Why not check out some of my projects?
            </span>
          </h2>

          {/* Buttons for call of action */}
          <div className="m-4 space-x-10 flex lg:mt-0 lg:flex-shrink-0">
            <LinkButton
              className={classNames(
                "inline-flex items-center justify-center px-5 py-3 border border-transparent",
                "text-base font-medium rounded-md text-gray-900 ",
                "bg-lime-100 hover:bg-gray-800 hover:text-gray-100 smooth")}
              href="/projects"
              label="Projects" />

            <LinkButton
              className={classNames(
                "inline-flex items-center justify-center px-5 py-3 border border-transparent",
                "text-base font-medium rounded-md text-gray-900 ",
                "bg-lime-100 hover:bg-gray-800 hover:text-gray-100 smooth")}
              href="/blog"
              label="Blog" />
          </div>
        </div>
      </div>
    </div >


  )
}

export default Index;
