import { DocumentNode } from "@apollo/client";

export const gqlToString = (documentNode: DocumentNode): string => {
    return (documentNode.loc && documentNode.loc.source.body) as string;
}