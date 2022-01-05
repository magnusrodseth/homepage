import { gql } from "@apollo/client";

export const About = gql`
query About {
  about {
    data {
      attributes {
        content
        updatedAt
      }
    }
  }
}
`