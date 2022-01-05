import { About } from "../graphql/about"
import { BlogPostByID, BlogPostIDs } from "../graphql/blog"
import { ProjectByID, ProjectIDs } from "../graphql/projects"
import { gqlToString } from "../graphql/utils/gqlToString"

const fetchAPI = async (query: string, variables = {}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    })


    const json = await response.json()

    if (json.errors) {
        throw new Error('❌ Failed to fetch from API.')
    }

    return json.data
}

// ----- Blog -----
export const getBlogPostIDs = async () => fetchAPI(gqlToString(BlogPostIDs))

export const getBlogPostByID = async (id: string) => fetchAPI(gqlToString(BlogPostByID), { id })

// ----- Projects -----
export const getProjectIDs = async () => fetchAPI(gqlToString(ProjectIDs))

export const getProjectByID = async (id: string) => fetchAPI(gqlToString(ProjectByID), { id })

// ----- About -----
export const getAbout = async () => fetchAPI(gqlToString(About))