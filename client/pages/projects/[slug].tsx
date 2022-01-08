import { GetStaticPaths, GetStaticProps } from "next"
import ArticleComponent from "../../components/article/ArticleComponent";
import { getFrontMatters, getMdxBySlug, MDX_PROJECTS_PATH } from "../../lib/mdx";
import { Article } from "../../types/article";

const Project = ({ project }: { project: Article }) => {
    return <ArticleComponent article={project} />
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
