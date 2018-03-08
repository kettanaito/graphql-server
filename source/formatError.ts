import { GraphQLError as NativeGraphQLError } from 'graphql';
import { GraphQLError as CustomGraphQLError } from '@classes';

export default function formatError(error: NativeGraphQLError, returnNull: boolean = false) {
  const originalError: NativeGraphQLError | CustomGraphQLError = error.originalError;

  if (originalError instanceof CustomGraphQLError) {
    return originalError.serialize(error);
  }

  return returnNull ? null : error;
}
