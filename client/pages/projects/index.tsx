import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import Wrapper from '../../components/Wrapper';
import { Project, ProjectEntity, UploadFile, useCompactProjectsQuery } from '../../generated/graphql'
import classNames from '../../utils/classNames';


const ProjectIndex = () => {
    const { data, loading, error } = useCompactProjectsQuery();

    const compactProjects = (data?.projects?.data as ProjectEntity[]);


    if (loading) return <h1>loading...</h1>

    if (error) return <h1>error!</h1>

    return (
        <div className="h-screen mb-10">
            <div className="text-center mx-4">
                <h1 className="m-auto text-4xl md:text-6xl my-6 font-mono font-bold text-indigo-300">Projects</h1>
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

                    return (
                        <Link href={`projects/${id}`} passHref key={id}>
                            <a>
                                <Wrapper className={classNames(
                                    "hover:cursor dark:bg-gray-700 rise-on-hover p-2",
                                )}>

                                    <h1 className={classNames(
                                        "text-xl md:text-3xl m-2",
                                        "font-bold tracking-wide text-sky-200",
                                    )}>{title}</h1>
                                    <h2 className="text-lg md:text-xl m-4"><span className="text-lime-200 font-bold">@</span>{" "}{subtitle}</h2>

                                    {/* Render thumbnail if it exists */}
                                    {thumbnail?.data?.attributes
                                        ?
                                        <Wrapper className="dark:bg-gray-900 rise-on-hover w-50 h-50 relative">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_API_URL}${thumbnail.data.attributes.url}`}
                                                alt={title}
                                                width={thumbnail.data.attributes.width as number}
                                                height={thumbnail.data.attributes.height as number}
                                            // layout="fill"
                                            // objectFit="cover"
                                            />
                                        </Wrapper>
                                        : ""}
                                </Wrapper>
                            </a>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectIndex

// <div className={classNames("h-screen")}>
//         {
//             compactProjects.map((project, index) => {
//                 let url: string | undefined = undefined;
//                 const id = project.id as string;
//                 const { title, subtitle, thumbnail } = project.attributes as Project


//                 if (thumbnail?.data?.attributes) {
//                     url = thumbnail.data.attributes.url
//                 }

//                 return (<Link key={index} href={`projects/${id}`} passHref>
//                     <div>
//                         <Wrapper className={classNames("smooth glass border-[1px] border-gray-200")}>
//                             {/* Text content */}
//                             <h1>{title}</h1>
//                             <h2>{subtitle}</h2>
//                         </Wrapper>
//                     </div >
//                 </Link>
//                 )
//             })}
//     </div >