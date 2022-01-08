import Image from "next/image"
import classNames from '../utils/classNames';
import PageWrapper from '../components/PageWrapper';

const About = () => {
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
                    "grayscale"
                )}>
                    <Image
                        src={"url"}
                        alt={"Profile picture"}
                        layout="fill"
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL={"url"}
                    />
                </div>
            </div>
        </PageWrapper>
    )
}

// export const getStaticProps = async () => {
//     // const response = await getAbout();
//     // const { about: { data: { attributes } } } = response;

//     // return { props: { attributes } }
// }

export default About