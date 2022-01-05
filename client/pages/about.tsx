import { getAbout } from '../lib/api';
import { About, UploadFile } from "../generated/graphql"
import Markdown from '../components/Markdown';
import Image from "next/image"

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
        <div className="h-full">
            <div className="text-center mx-4">
                <h1 className="m-auto text-4xl md:text-6xl my-6 font-mono font-bold text-indigo-300">
                    👋🏼{" "}About me
                </h1>
            </div>

            <div className="smooth bg-gradient-to-b from-indigo-400 to-sky-200 opacity-90 w-screen">

                <Markdown>{content}</Markdown>


                {image?.data?.attributes && url != null
                    ? <div className="h-72 w-96 relative rise-on-hover">
                        <Image
                            src={url}
                            alt={"Profile picture"}
                            // width={width as number}
                            // height={height as number}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={url}
                            className="rounded-lg"
                        />
                    </div>
                    : ""}</div>
        </div>
    )
}

export const getStaticProps = async () => {
    const response = await getAbout();
    const { about: { data: { attributes } } } = response;

    return { props: { attributes } }
}

export default About