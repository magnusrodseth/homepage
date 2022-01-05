import axios from "axios"
import { GetStaticProps } from "next/types"
import { BlogPost, BlogPostEntity, BlogPostEntityResponse } from "../../generated/graphql"
import { getBlogPostIDs } from "../../lib/api"
import { Path } from "../../utils/types"

const BlogPost = (props: BlogPost) => {
    return <h1></h1>
}

export const getStaticPaths = async () => {
    const response = await getBlogPostIDs();
    const { blogPosts: { data } } = response;

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog-posts/${params.id}`)

        // Clean up data
        const post = await response.data;

        const { data: { attributes } } = post;

        return { props: { attributes } }
    }

    return { props: { undefined } }
}

export default BlogPost