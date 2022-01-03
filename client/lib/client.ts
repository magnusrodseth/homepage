import sanityClient from "@sanity/client";

/**
 * Providing the createClient() function with Documents allows
 * the client to be aware of the generated types.
 */
export default sanityClient({
    // Note: these are useful to pull from environment variables
    // (required) your sanity project id
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string | "",
    // (required) your sanity dataset
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string | "production",

    useCdn: true // `false` if you want to ensure fresh data
});