import client from "../../lib/client"
import { GetStaticPaths, GetStaticProps } from "next"

const Project = ({ project }: any) => {
    return <div className="flex justify-center align-center mt-20 text-white">
        <h1>{project.title}</h1>
    </div>
}

export const getStaticPaths = async () => {
    const paths = await client.fetch(
        `*[_type == "project" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string;

    const project = await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]`,
        { slug }
    )

    return {
        props: {
            project
        }
    }
}

export default Project