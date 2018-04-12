// @flow
import type {
  GraphQLFieldResolver,
  GraphQLResolveInfo
} from 'graphql/type/definition.js.flow'
import { GraphQLError } from '~/classes'

/**
 * Resolves a field for authenticated user only.
 */
export default function withAuthentication() {
  return (next: Function) => {
    return (
      root: any,
      args: any,
      context: any,
      info: GraphQLResolveInfo
    ): GraphQLFieldResolver<*> => {
      const { user } = context

      if (!user) {
        throw new GraphQLError(
          'NOT_AUTHENTICATED',
          'Cannot resolve query: user not authenticated.'
        )
      }

      return next(root, args, context, info)
    }
  }
}
