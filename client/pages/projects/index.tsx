import { useCompactProjectsQuery } from '../../generated/graphql'


const Projects = () => {
    const { data, loading, error } = useCompactProjectsQuery();

    const compactProjects = data?.projects?.data;

    if (loading) return <h1>loading...</h1>

    if (error) return <h1>error!</h1>

    console.log(data)

    return <div className="h-screen">Heres some content</div>
}

export default Projects