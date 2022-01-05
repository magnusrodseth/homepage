import { gql } from "@apollo/client";

export const CompactProjects = gql`
query CompactProjects {
  projects {
    data {
      id
      attributes {
        title
        subtitle
        thumbnail {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`