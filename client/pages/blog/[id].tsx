import { GetStaticProps } from "next/types"
import { BlogPost, BlogPostEntity, BlogPostEntityResponse } from "../../generated/graphql"
import { getBlogPostByID, getBlogPostIDs } from "../../lib/api"
import { Path } from "../../utils/types"

const BlogPost = (props: BlogPost) => {
    return <h1></h1>
}

export const getStaticPaths = async () => {
    const { blogPosts: { data } } = await getBlogPostIDs();

    const paths: Path[] = data.map((post: BlogPostEntity) => ({
        // Next requires the value of key 'id' to be of type string
        params: { id: (post.id as string).toString() }
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
        const { blogPost: { data: { attributes } } } = await getBlogPostByID(params.id as string);

        return { props: { attributes } }
    }

    return { props: { undefined } }
}

export default BlogPost