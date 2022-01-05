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
            }
          }
        }
        images {
          data {
            attributes {
              url
              caption
            }
          }
        }
        updatedAt
      }
    }
  }
}
`