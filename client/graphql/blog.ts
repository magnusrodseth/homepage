import { gql } from "@apollo/client";

export const BlogPostIDs = gql`
query BlogPostIDs {
  blogPosts {
    data {
      id
    }
  }
}
`

export const BlogPostByID = gql`
query BlogPostByID($id: ID!) {
  blogPost(id: $id) {
    data {
      id
      attributes {
        title
        description
        content
        updatedAt
      }
    }
  }
}
`

export const CompactBlogPosts = gql`
query CompactBlogPosts {
  blogPosts {
    data {
      id
      attributes {
        title
        description
        updatedAt
      }
    }
  }
}
`