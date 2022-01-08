import Image from 'next/image';
import Link from 'next/link';
import PageWrapper from '../../components/PageWrapper';
import Wrapper from '../../components/Wrapper';
import classNames from '../../utils/classNames';
import Heading from '../../components/Heading';
import { FrontMatter } from '../../types/frontmatter';
import { GetStaticProps } from 'next';
import { getFrontMatters, MDX_PROJECTS_PATH } from '../../lib/mdx';
import NoContent from '../../components/NoContent';


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

                {!projects || projects.length == 0
                    ? <NoContent />
                    : <div className={classNames(
                        "grid grid-cols-1 md:grid-cols-2 mx-2"
                    )}>
                        {projects.map((project, index) => {
                            return (
                                <Wrapper className={classNames(
                                    "bg-indigo-100 dark:bg-gray-700 rise-on-hover p-2"
                                )} key={index}>
                                    <div className="grid lg:grid-cols-4">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            {/* Title */}
                                            <Link href={`projects/${project.slug}`} passHref>
                                                <a>
                                                    <h1 className={classNames(
                                                        "text-xl md:text-3xl m-2 smooth",
                                                        "font-bold tracking-wide smooth",
                                                        "text-gray-700 dark:text-sky-200",
                                                        "dark:hover:text-indigo-300 hover:text-black"
                                                    )}>{project.title}
                                                    </h1>
                                                </a>
                                            </Link>
                                            {/* Subtitle */}
                                            <Link href={`projects/${project.slug}`} passHref>
                                                <a>
                                                    <h2 className="text-lg md:text-xl m-4"><span className={classNames(
                                                        "text-indigo-700 dark:text-lime-200 font-bold",
                                                        "smooth"
                                                    )}>@</span>{" "}{project.description}</h2>
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="lg:col-start-3 lg:col-span-2 m-auto">
                                            {/* Render thumbnail if it exists */}
                                            {project.thumbnail
                                                ? <Wrapper className="dark:bg-gray-900 bg-gray-100 rise-on-hover w-11/12 h-11/12 relative">
                                                    <Link href={`projects/${project.slug}`} passHref>
                                                        <a className=" relative">
                                                            <Image
                                                                src={project.thumbnail}
                                                                alt={project.title}
                                                                layout="fill"
                                                                objectFit='cover'
                                                                placeholder="blur"
                                                                blurDataURL={project.thumbnail} />
                                                        </a>
                                                    </Link>
                                                </Wrapper>
                                                : null}

                                        </div>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>}

            </div>
        </PageWrapper>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const projects = await getFrontMatters(MDX_PROJECTS_PATH)

    return { props: { projects } }
}

export default ProjectIndex

