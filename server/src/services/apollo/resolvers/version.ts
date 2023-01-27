import { Resolvers, VersionResolvers } from "../_generated/graphql"

export const version: Resolvers = {
    Query: {
        version: () => {
            return {
                version: process.env.npm_package_version ?? 'unknown',
            }
        }
    }
}

export default version
