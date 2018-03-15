import { GraphQLError } from '@classes';
import withAuthentication from '@schema/middleware/withAuthentication';

/**
 * Resolves a field for the user which matches the provided permissions.
 */
export default function withAuthorization(permissions) {
  return (next) => {
    return withAuthentication()((root, args, context, info) => {
      const { user } = context;

      if (user.permissions.includes(...permissions)) {
        return next(root, args, context, info);
      }

      throw new GraphQLError('NOT_AUTHORIZED', 'Cannot resolve query: not authorized');
    });
  };
}
