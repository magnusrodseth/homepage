import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { GetStaticProps } from "next"
import ArticleWrapper from "../../components/article/ArticleWrapper";
import Byline from "../../components/article/Byline";
import BackLink from "../../components/BackLink";
import Markdown from "../../components/markdown/Markdown";
import Wrapper from "../../components/Wrapper";
import { Project, ProjectEntity } from "../../generated/graphql";
import { getProjectByID, getProjectIDs } from "../../lib/api";
import classNames from "../../utils/classNames";
import { parseDate } from "../../utils/parseDate";
import { readingTime } from "../../utils/readingTime";
import { Path } from "../../utils/types";

const Project = ({ attributes }: { attributes: Project }) => {
    const { title, subtitle, description, updatedAt } = attributes;

    return (
        <ArticleWrapper>
            <Byline
                lastUpdated={updatedAt as string}
                readingTimeInMinutes={readingTime(`${title}${subtitle}${description}`)}
            />

            <div className="px-4 w-full">
                {/* Title and subtitle */}
                <h1 className={classNames(
                    "text-2xl md:text-4xl m-2",
                    "font-bold tracking-wide smooth",
                    "text-gray-700 dark:text-sky-200",
                )}>{title}
                </h1>
                <h2 className="text-xl md:text-2xl m-4">
                    <span className={classNames(
                        "text-indigo-700 dark:text-lime-200 font-bold",
                        "smooth mr-2")}>
                        @
                    </span>
                    {subtitle}
                </h2>

                <Markdown className="max-w-full dark:text-gray-100">
                    {description}
                </Markdown>

                <div className="max-w-max m-auto">
                    <BackLink href="/projects" title={"projects"} />
                </div>
            </div>
        </ArticleWrapper >

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
