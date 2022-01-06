import { CalendarIcon } from "@heroicons/react/outline";
import { GetStaticProps } from "next"
import Link from "next/link";
import Markdown from "../../components/Markdown";
import Wrapper from "../../components/Wrapper";
import { Project, ProjectEntity } from "../../generated/graphql";
import { getProjectByID, getProjectIDs } from "../../lib/api";
import classNames from "../../utils/classNames";
import { parseDate } from "../../utils/parseDate";
import { Path } from "../../utils/types";

const Project = ({ attributes }: { attributes: Project }) => {
    const { title, subtitle, description, updatedAt, thumbnail } = attributes;

    let url: string | null = null;
    let width = 0;
    let height = 0;

    if (thumbnail?.data?.attributes) {
        url = `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.data.attributes.url}`
        width = thumbnail?.data?.attributes.width as number;
        height = thumbnail?.data?.attributes.height as number;
    }

    console.log(attributes)

    return (
        <div className="h-full flex justify-center pb-16 m-4">

            <Wrapper className="w-3/4 dark:bg-gray-700">

                <div className="p-4">
                    {/* Title and subtitle */}
                    <h1 className={classNames(
                        "text-2xl md:text-4xl m-2",
                        "font-bold tracking-wide smooth",
                        "text-gray-700 dark:text-sky-200",
                    )}>{title}
                    </h1>
                    <h2 className="text-xl md:text-2xl m-4">
                        <span className={classNames(
                            "text-indigo-400 dark:text-lime-200 font-bold",
                            "smooth mr-2")}>@</span>{subtitle}</h2>

                    {/* Updated at */}
                    <div className="flex flex-row space-x-1.5 m-4">
                        <CalendarIcon className="w-5 md:w-6 text-indigo-700 dark:text-lime-200" />
                        <h2 className="text-md md:text-lg mt-0.5 m-0">
                            Last updated: <span className="font-bold">{parseDate(updatedAt as string)}</span>
                        </h2>
                    </div>

                    <Markdown className="p-2 leading-loose">
                        {description}
                    </Markdown>
                </div>
            </Wrapper >
        </div >
    )
}


export const getStaticPaths = async () => {
    // const { projects: { data } } = await getProjectIDs();
    const { projects: { data } } = await getProjectIDs();

    const paths: Path[] = data.map((project: ProjectEntity) => ({
        // Next requires the value of key 'id' to be of type string
        params: { id: (project.id as string).toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;

    if (params) {
        // We're only interested in the attributes as props for the component
        const { project: { data: { attributes } } } = await getProjectByID(params.id as string);

        return { props: { attributes } }
    }

    return { props: { undefined } }
}

export default Project
