import Image from "next/image"
import Link from "next/link"
import classNames from "../utils/classNames"

const Home = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="smooth dark:bg-indigo-300 bg-indigo-400 opacity-90 w-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl tracking-wide text-gray-900 sm:text-4xl">
            <span className="block text-md my-4 font-bold tracking-wide">
              Hello, my name is Magnus Rødseth.
            </span>
            <span className="block text-xl my-4 tracking-wide">
              I&apos;m a software developer based in Norway, currently studying Computer Science at NTNU.
            </span>

            {/* TODO: Add typewriter effect here with information from resume.
             - Fundamentally curious
             - an engineer at heart
             - eager to challange myself
              */}

            {/* TODO: Add Memoji image   <div className="bottom-0">
            <Image src="/img/logo.png" alt="Me as a Memoji" width="400" height="400" />
          </div> */}

            <span className="block text-sky-100 font-extrabold">
              Why not check out some of my projects?
            </span>
          </h2>
          <div className="m-4 space-x-10 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/projects">
                <a
                  className={classNames(
                    "inline-flex items-center justify-center px-5 py-3 border border-transparent",
                    "text-base font-medium rounded-md text-gray-900 bg-sky-100 hover:bg-gray-800 hover:text-gray-100",
                    "smooth"
                  )}
                >
                  Projects
                </a>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/blog">
                <a
                  className={classNames(
                    "inline-flex items-center justify-center px-5 py-3 border border-transparent",
                    "text-base font-medium rounded-md text-gray-900  bg-lime-50 hover:bg-gray-800 hover:text-gray-100",
                    "transition transform duration-500 ease-in-out"
                  )}
                >
                  Blog
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home
