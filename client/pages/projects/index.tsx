import Image from 'next/image';
import Wrapper from '../../components/Wrapper';
import { Project, useCompactProjectsQuery } from '../../generated/graphql'
import classNames from '../../utils/classNames';
import { LOCAL_BACKEND_URL } from '../../utils/constants';


const ProjectIndex = () => {
    const { data, loading, error } = useCompactProjectsQuery();

    const compactProjects = data?.projects?.data
        .map(project => project.attributes) as Project[];

    if (loading) return <h1>loading...</h1>

    if (error) return <h1>error!</h1>


    return <div className={classNames("h-screen")}>
        {
            compactProjects.map((project, index) => {
                let url: string | undefined = undefined;

                const { title, subtitle, thumbnail } = project

                if (thumbnail?.data?.attributes) {
                    url = thumbnail.data.attributes.url
                }

                return (
                    <div key={index}>
                        <Wrapper className={classNames("smooth glass border-[1px] border-gray-200")}>
                            {/* Text content */}
                            <h1>{title}</h1>
                            <h2>{subtitle}</h2>
                        </Wrapper>
                    </div >
                )
            })}
    </div >
}

export default ProjectIndex