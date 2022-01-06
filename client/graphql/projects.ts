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
              width
              height
            }
          }
        }
      }
    }
  }
}
`

export const ProjectIDs = gql`
query ProjectIDs {
  projects {
    data {
      id
    }
  }
}
`

export const ProjectByID = gql`
query ProjectByID($id: ID!) {
  project(id: $id) {
    data {
      id
      attributes {
        title
        subtitle
        startDate
        endDate
        description
        categories {
          data {
            attributes {
              name
            }
          }
        }
        thumbnail {
          data {
            attributes {
              url
              caption
              width
              height
            }
          }
        }
        updatedAt
      }
    }
  }
}
`