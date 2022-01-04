import Link from "next/link";
import { BlogPost, useCompactBlogPostsQuery } from "../../generated/graphql"

const BlogIndex = () => {
    const { data, loading, error } = useCompactBlogPostsQuery();

    if (loading) {
        return <h1>loading</h1>
    }

    if (error) {
        return <h1>error</h1>
    }

    const compactBlogPosts = data?.blogPosts?.data;

    console.log(compactBlogPosts)

    return <div className="h-screen">{compactBlogPosts
        ? compactBlogPosts.map((post, index) => {
            const id = post.id;
            const attributes = post.attributes as BlogPost;
            const { title, description, updatedAt } = attributes

            return (
                <Link href={`/blog/${id}`} key={index} passHref>
                    <div key={index}>

                        <h1>{title}</h1>
                        <h2>{description}</h2>
                        <h3>Last updated: {updatedAt}</h3>

                    </div>
                </Link>
            )
        })
        : ""}</div>
}

export default BlogIndex