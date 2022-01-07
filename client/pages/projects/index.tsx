import Image from 'next/image';
import Link from 'next/link';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import PageWrapper from '../../components/PageWrapper';
import Wrapper from '../../components/Wrapper';
import { Project, ProjectEntity, useCompactProjectsQuery } from '../../generated/graphql'
import classNames from '../../utils/classNames';
import Heading from '../../components/Heading';


const ProjectIndex = () => {
    const { data, loading, error } = useCompactProjectsQuery();

    const compactProjects = (data?.projects?.data as ProjectEntity[]);

    return (
        <PageWrapper>
            {loading ? <Loading /> : null}
            {error ? <Error /> : null}

            {!loading && !error
                ? <div>
                    <Heading
                        header={`👨‍💻 Projects`}
                        description={`
                        Below, you can find a collection of the projects I am most proud of. 
                        Click on a project to read more about it.
                        `} />

                    <div className={classNames(
                        "grid grid-cols-1 md:grid-cols-2"
                    )}>
                        {compactProjects.map((project, index) => {
                            // Clean up data
                            const id = project.id as string;
                            const { title, subtitle, thumbnail } = project.attributes as Project;

                            let url: string | null = null;
                            let width = 0;
                            let height = 0;

                            if (thumbnail?.data?.attributes) {
                                url = `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.data.attributes.url}`;
                                width = thumbnail?.data?.attributes.width as number;
                                height = thumbnail?.data?.attributes.height as number;
                            }

                            return (
                                <Wrapper className={classNames(
                                    "hover:cursor bg-sky-50 dark:bg-gray-700 rise-on-hover p-2"
                                )} key={id}>
                                    <div className="grid lg:grid-cols-4">
                                        <div className="lg:col-start-1 lg:col-span-2">
                                            {/* Title */}
                                            <Link href={`projects/${id}`} passHref>
                                                <h1 className={classNames(
                                                    "text-xl md:text-3xl m-2 smooth",
                                                    "font-bold tracking-wide smooth hover:cursor-pointer",
                                                    "text-gray-700 dark:text-sky-200",
                                                    "dark:hover:text-indigo-300 hover:text-black"
                                                )}>{title}
                                                </h1>
                                            </Link>
                                            {/* Subtitle */}
                                            <h2 className="text-lg md:text-xl m-4"><span className={classNames(
                                                "text-indigo-400 dark:text-lime-200 font-bold",
                                                "smooth"
                                            )}>@</span>{" "}{subtitle}</h2>
                                        </div>

                                        <div className="lg:col-start-3 lg:col-span-2">
                                            {/* Render thumbnail if it exists */}
                                            {thumbnail?.data?.attributes && url !== null
                                                ?
                                                <Wrapper className="dark:bg-gray-900 bg-gray-100 rise-on-hover w-50 h-50 relative">
                                                    <Image
                                                        src={url}
                                                        alt={title}
                                                        width={width}
                                                        height={height}
                                                        placeholder="blur"
                                                        blurDataURL={url} />
                                                </Wrapper>
                                                : null}
                                        </div>
                                    </div>

                                </Wrapper>
                            );
                        })}
                    </div>
                </div>
                : ""}


        </PageWrapper>
    )
}

export default ProjectIndex

