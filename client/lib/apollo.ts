import {
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql` as string | "http://localhost:1337/graphql",
    cache: new InMemoryCache()
});

export default client
