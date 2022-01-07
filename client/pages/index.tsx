import Image from "next/image"
import classNames from "../utils/classNames"
import Typewriter from 'typewriter-effect';
import LinkButton from "../components/LinkButton";

const Index = () => {
  const typewriterStrings = ['fundamentally curious.', 'an engineer at heart.', 'eager to challenge myself.'];

  return (
    // Jumbotron
    <div className="pb-4">
      <div className="smooth bg-gradient-to-b mt-16 from-sky-200 to-indigo-400 w-screen">
        <div className={classNames(
          "w-screen flex flex-col md:flex-row",
          "md:items-end justify-center")}>

          <div className="flex flex-col mx-8 my-6">
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
              <span className="block my-10 text-sky-100 font-extrabold">
                Why not check out some of my projects?
              </span>
            </h2>

            {/* Buttons for call of action */}
            <div className="my-4 space-x-10 flex lg:mt-0 lg:flex-shrink-0">
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

          {/* Memoji Logo */}
          <div className="flex content-end h-full">
            {/* The image should scale dynamically. Additionally, this image is static; it is not served through the API. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo.png"
              alt="Momoji Logo"
              className="w-1/2 md:w-3/4 lg:w-full -my-1.5 md:-my-1 lg:-my-2 m-auto"
            />
          </div>

        </div>
      </div>
    </div >


  )
}

export default Index;
