import PageWrapper from '../../components/PageWrapper';
import classNames from '../../utils/classNames';
import { FrontMatter } from '../../types/frontmatter';
import { GetStaticProps } from 'next';
import { getFrontMatters, MDX_PROJECTS_PATH } from '../../lib/mdx';
import ArticleCards from '../../components/article/ArticleCards';


const ProjectIndex = ({ projects }: { projects: FrontMatter[] }) => {
    return (
        <PageWrapper>
            <div>
                <div className="text-center mx-4">
                    <h1 className={classNames(
                        "smooth m-auto text-4xl md:text-6xl my-6 font-mono tracking-tight font-bold",
                        "text-indigo-400 dark:text-indigo-300"
                    )}>
                        👨‍💻{" "}Projects
                    </h1>
                </div>
                <ArticleCards articles={projects} />
            </div>
        </PageWrapper>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const projects = await getFrontMatters(MDX_PROJECTS_PATH)

    return { props: { projects } }
}

export default ProjectIndex

