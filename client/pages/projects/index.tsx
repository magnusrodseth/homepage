import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '../../components/Wrapper';
import { Project, ProjectEntity, useCompactProjectsQuery } from '../../generated/graphql'
import classNames from '../../utils/classNames';
import { LOCAL_BACKEND_URL } from '../../utils/constants';


const ProjectIndex = () => {
    const { data, loading, error } = useCompactProjectsQuery();

    const compactProjects = data?.projects?.data as ProjectEntity[];

    if (loading) return <h1>loading...</h1>

    if (error) return <h1>error!</h1>


    return <div className={classNames("h-screen")}>
        {
            compactProjects.map((project, index) => {
                let url: string | undefined = undefined;
                const id = project.id as string;
                const { title, subtitle, thumbnail } = project.attributes as Project


                if (thumbnail?.data?.attributes) {
                    url = thumbnail.data.attributes.url
                }

                return (<Link key={index} href={`projects/${id}`} passHref>
                    <div>
                        <Wrapper className={classNames("smooth glass border-[1px] border-gray-200")}>
                            {/* Text content */}
                            <h1>{title}</h1>
                            <h2>{subtitle}</h2>
                        </Wrapper>
                    </div >
                </Link>
                )
            })}
    </div >
}

export default ProjectIndex