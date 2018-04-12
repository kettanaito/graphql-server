import { GraphQLError } from '~/classes'

export default function formatError(error, returnNull = false) {
  const originalError = error.originalError

  if (originalError instanceof GraphQLError) {
    return originalError.serialize(error)
  }

  return returnNull ? null : error
}
