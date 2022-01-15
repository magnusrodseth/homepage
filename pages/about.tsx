import Image from "next/image"
import classNames from '../utils/classNames';
import PageWrapper from '../components/PageWrapper';
import { GetStaticProps } from "next";
import { getMdxBySlug, MDX_ABOUT_PATH } from "../lib/mdx";
import { Article } from "../types/article";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { components } from "../components/MdxComponents";

const About = ({ about }: { about: Article }) => {
    const { code, frontmatter } = about;

    const Component: any = useMemo(() => getMDXComponent(code), [code])

    return (
        <PageWrapper>
            <div className="text-center mx-4">
                <h1 className={classNames(
                    "smooth m-auto text-4xl md:text-6xl my-6 font-mono font-bold",
                    "text-indigo-400 dark:text-indigo-300 tracking-tight"
                )}>
                    👋🏼{" "}About me
                </h1>
            </div>

            <div className={classNames(
                "smooth w-screen",
                "grid grid-rows-2 lg:grid-rows-none lg:grid-cols-3 auto-rows-fr"
            )}>

                <div className={classNames(
                    // 24.5rem matches the height of the Markdown content
                    "h-[24.5rem] relative rise-on-hover",
                    "m-auto mx-6 rounded-md",
                    "grayscale rounded-lg"
                )}>
                    <Image
                        src={"/img/profile-picture.jpg"}
                        alt={"Profile picture"}
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL={"url"}
                    />
                </div>
                <div className={classNames(
                    "m-auto max-w-full min-w-0 text-base lg:text-lg text-fore-subtle",
                    "mx-8 px-2 rise-on-hover lg:col-start-1 lg:col-span-2 lg:row-start-1")}>
                    <Component components={components} />
                </div>

            </div>
        </PageWrapper>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { code, frontmatter } = await getMdxBySlug("about", MDX_ABOUT_PATH)

    return {
        props: {
            about: {
                code,
                frontmatter: frontmatter,
            } as Article,
        },
    }
}

export default About
