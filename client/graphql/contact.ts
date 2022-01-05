import { gql } from "@apollo/client";

export const Contact = gql`
query Contact {
  contact {
    data {
      attributes {
        email
        github
        linkedin
      }
    }
  }
}
`