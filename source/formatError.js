// @flow
import { GraphQLError } from '~/classes'

export default function formatError(
  error: GraphQLError,
  returnNull: boolean = false
) {
  const originalError: GraphQLError = error.originalError

  if (originalError instanceof GraphQLError) {
    return originalError.serialize(error)
  }

  return returnNull ? null : error
}
