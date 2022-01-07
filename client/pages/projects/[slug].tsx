import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ArticleWrapper from "../../components/article/ArticleWrapper";
import Byline from "../../components/article/Byline";
import BackLink from "../../components/BackLink";
import Markdown from "../../components/markdown/Markdown";
import { getFrontMatters, getMdxBySlug, MDX_PROJECTS_PATH } from "../../lib/mdx";
import { Article } from "../../types/article";
import classNames from "../../utils/classNames";
import { readingTime } from "../../utils/readingTime";

const Project = (project: Article) => {

    return (
        <ArticleWrapper>
            <Byline
                lastUpdated={"post" as string}
                readingTimeInMinutes={readingTime(`${"title"}${"subtitle"}${"description"}`)}
            />

            <div className="px-4 w-full">
                {/* Title and subtitle */}
                <h1 className={classNames(
                    "text-2xl md:text-4xl m-2",
                    "font-bold tracking-wide smooth",
                    "text-gray-700 dark:text-sky-200",
                )}>{"title"}
                </h1>
                <h2 className="text-xl md:text-2xl m-4">
                    <span className={classNames(
                        "text-indigo-700 dark:text-lime-200 font-bold",
                        "smooth mr-2")}>
                        @
                    </span>
                    {"subtitle"}
                </h2>

                <Markdown className="max-w-full dark:text-gray-100">
                    {"description"}
                </Markdown>

                <div className="max-w-max m-auto">
                    <BackLink href="/projects" title={"projects"} />
                </div>
            </div>
        </ArticleWrapper >

    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const projects = await getFrontMatters(MDX_PROJECTS_PATH)

    return {
        paths: projects.map(project => ({
            params: {
                slug: project.slug,
            },
        })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { code, frontmatter } = await getMdxBySlug(context?.params?.slug as string, MDX_PROJECTS_PATH)

    return {
        props: {
            project: {
                code,
                frontmatter: frontmatter,
            } as Article,
        },
    }
}

export default Project
