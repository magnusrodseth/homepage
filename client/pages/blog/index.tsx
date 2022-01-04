import Link from "next/link";
import UnderDevelopment from "../../components/UnderDevelopment"
import { useCompactBlogPostsQuery } from "../../generated/graphql"

const BlogIndex = () => {
    const { data, loading, error } = useCompactBlogPostsQuery();

    if (loading) {
        return <h1>loading</h1>
    }

    if (error) {
        return <h1>error</h1>
    }

    const compactBlogPosts = data?.blogPosts?.data
        ? data?.blogPosts?.data
        : undefined;

    console.log(compactBlogPosts)

    return <div className="h-screen">{compactBlogPosts
        ? compactBlogPosts.map((post, index) => {
            if (post.attributes) {
                const { title, description, updatedAt, slug } = post.attributes;

                return (
                    <Link href={`/blog/${slug}`} key={index} passHref>
                        <div key={index}>

                            <h1>{title}</h1>
                            <h2>{description}</h2>
                            <h3>Last updated: {updatedAt}</h3>

                        </div>
                    </Link>
                )
            }
        })
        : ""}</div>
}

export default BlogIndex