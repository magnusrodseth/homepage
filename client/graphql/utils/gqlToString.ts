import { DocumentNode } from "@apollo/client";

/**
 * Converts an Apollo DocumentNode to a string representation that can be used as a HTTP query.
 * See `client/lib/api.ts` for more information on how these stringified gql statements are used.
 * 
 * @param documentNode is the Apollo DocumentNode to stringify.
 * @returns a string representation of of the Apollo DocumentNode.
 */
export const gqlToString = (documentNode: DocumentNode): string => {
    return (documentNode.loc && documentNode.loc.source.body) as string;
}