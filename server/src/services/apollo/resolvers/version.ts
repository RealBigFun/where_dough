import { Resolvers, VersionResolvers } from "../_generated/graphql"

export const version: Resolvers = {
    Query: {
        version: () => {
            return {
                version: "0.0.1"
            }
        }
    },
}

export default version
