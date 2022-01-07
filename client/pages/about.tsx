import { getAbout } from '../lib/api';
import { About, UploadFile } from "../generated/graphql"
import Markdown from '../components/markdown/Markdown';
import Image from "next/image"
import classNames from '../utils/classNames';

const About = ({ attributes }: { attributes: About }) => {
    // Clean up data
    const { content, updatedAt, image } = attributes
    const { data } = image

    let url: string | null = null;
    let width = 0;
    let height = 0

    if (image?.data?.attributes) {
        url = `${process.env.NEXT_PUBLIC_API_URL}${image.data.attributes.url}`
        width = image.data.attributes.width as number;
        height = image.data.attributes.height as number;
    }

    return (
        <div className="h-full pb-16">
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

                {image?.data?.attributes && url != null
                    ? <div className={classNames(
                        // 24.5rem matches the height of the Markdown content
                        "h-[24.5rem] relative rise-on-hover",
                        "m-auto mx-6 rounded-md",
                        "grayscale"
                    )}>
                        <Image
                            src={url}
                            alt={"Profile picture"}
                            layout="fill"
                            objectFit="contain"
                            placeholder="blur"
                            blurDataURL={url}
                        />
                    </div>
                    : ""}

                <Markdown className={classNames(
                    "m-auto w-screen lg:max-w-full lg:col-start-1 lg:col-span-2 lg:row-start-1 rise-on-hover",
                )}>
                    {content}
                </Markdown>
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const response = await getAbout();
    const { about: { data: { attributes } } } = response;

    return { props: { attributes } }
}

export default About