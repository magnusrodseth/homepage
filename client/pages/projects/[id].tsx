import { GetStaticProps } from "next"
import { Project, ProjectEntity } from "../../generated/graphql";
import { getProjectByID, getProjectIDs } from "../../lib/api";
import { Path } from "../../utils/types";

const Project = (props: Project) => {
    return (
        <div className="flex justify-center align-center mt-20 text-white">
            <h1>shid</h1>
        </div>
    )
}


export const getStaticPaths = async () => {
    // const { projects: { data } } = await getProjectIDs();
    const { projects: { data } } = await getProjectIDs();

    const paths: Path[] = data.map((project: ProjectEntity) => ({
        // Next requires the value of key 'id' to be of type string
        params: { id: (project.id as string).toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;

    if (params) {
        // We're only interested in the attributes as props for the component
        const { project: { data: { attributes } } } = await getProjectByID(params.id as string);

        return { props: { attributes } }
    }

    return { props: { undefined } }
}

export default Project
