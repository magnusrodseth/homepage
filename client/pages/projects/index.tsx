import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '../../components/Wrapper';
import { Project, ProjectEntity, UploadFile, useCompactProjectsQuery } from '../../generated/graphql'
import classNames from '../../utils/classNames';


const ProjectIndex = () => {
    const { data, loading, error } = useCompactProjectsQuery();

    const compactProjects = (data?.projects?.data as ProjectEntity[]);


    if (loading) return <h1>loading...</h1>

    if (error) return <h1>error!</h1>

    return (
        <div className="h-full pb-16">
            <div className="text-center mx-4">
                <h1 className="m-auto text-4xl md:text-6xl my-6 font-mono font-bold text-indigo-300">
                    👨‍💻{" "}Projects
                </h1>
                <p className="text-lg md:text-2xl my-6">
                    Below, you can find a collection of the projects I am most proud of.{" "}
                    <span className="font-bold tracking-wide">Click on a project to read more about it.</span>
                </p>
            </div>

            <div className={classNames(
                "grid grid-cols-1 md:grid-cols-2"
            )}>
                {compactProjects.map((project, index) => {
                    const id = project.id as string;
                    const { title, subtitle, thumbnail } = project.attributes as Project;

                    let url: string | null = null;
                    let width = 0;
                    let height = 0;

                    if (thumbnail?.data?.attributes) {
                        url = `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.data.attributes.url}`
                        width = thumbnail?.data?.attributes.width as number;
                        height = thumbnail?.data?.attributes.height as number;
                    }

                    return (
                        <Wrapper className={classNames(
                            "hover:cursor dark:bg-gray-700 rise-on-hover p-2",
                        )} key={id}>
                            <div className="grid lg:grid-cols-4">
                                <div className="lg:col-start-1 lg:col-span-2">
                                    {/* Title */}
                                    <Link href={`blog/${id}`} passHref >
                                        <h1 className={classNames(
                                            "text-xl md:text-3xl m-2",
                                            "font-bold tracking-wide text-sky-200",
                                            "hover:text-indigo-300 smooth hover:cursor-pointer"
                                        )}>{title}
                                        </h1>
                                    </Link>
                                    <h2 className="text-lg md:text-xl m-4"><span className="text-lime-200 font-bold">@</span>{" "}{subtitle}</h2>
                                </div>

                                <div className="lg:col-start-3 lg:col-span-2">
                                    {/* Render thumbnail if it exists */}
                                    {thumbnail?.data?.attributes && url !== null
                                        ?
                                        <Wrapper className="dark:bg-gray-900 rise-on-hover w-50 h-50 relative">
                                            <Image
                                                src={url}
                                                alt={title}
                                                width={width}
                                                height={height}
                                                placeholder="blur"
                                                blurDataURL={url}
                                            />
                                        </Wrapper>
                                        : ""}
                                </div>
                            </div>

                        </Wrapper>
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectIndex

