import { GraphQLError as NativeGraphQLError } from 'graphql';
import { GraphQLError as CustomGraphQLError } from '@classes';

export default function formatError(error, returnNull = false) {
  const originalError = error.originalError;

  if (originalError instanceof CustomGraphQLError) {
    return originalError.serialize(error);
  }

  return returnNull ? null : error;
}
