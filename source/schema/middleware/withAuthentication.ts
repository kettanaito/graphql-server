import { GraphQLError } from '@classes';

/**
 * Resolves a field for authenticated user only.
 */
export default function withAuthentication() {
  return (next: Function) => {
    return (root, args, context, info) => {
      const { user } = context;

      if (!user) {
        throw new GraphQLError('NOT_AUTHENTICATED', 'Cannot resolve query: user not authenticated.');
      }

      return next(root, args, context, info);
    };
  }
}
