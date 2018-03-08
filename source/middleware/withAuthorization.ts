import { GraphQLError } from '@classes';
import withAuthentication from '@middleware/withAuthentication';

export default function withAuthorization(permissions, next: Function) {
  return withAuthentication((root, args, context, info) => {
    const { user } = context;

    if (user.permissions.includes(...permissions)) {
      return next(root, args, context, info);
    }

    throw new GraphQLError('NOT_AUTHORIZED', 'Cannot resolve query: not authorized');
  });
}
