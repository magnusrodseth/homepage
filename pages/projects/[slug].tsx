import { GetStaticPaths, GetStaticProps } from "next"
import ArticleComponent from "../../src/components/article/ArticleComponent";
import NoContent from "../../src/components/NoContent";
import { getFrontMatters, getMdxBySlug, MDX_PROJECTS_PATH } from "../../src/lib/mdx";
import { Article } from "../../src/types/article";

const Project = ({ project }: { project: Article }) => {
    return project ? <ArticleComponent article={project} backTo="projects" /> : <NoContent />
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
                frontmatter,
            } as Article,
        },
    }
}

export default Project
