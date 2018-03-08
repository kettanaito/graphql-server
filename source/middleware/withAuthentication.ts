import { GraphQLError } from '@classes';

export default function withAuthentication(next: Function) {
  return (root, args, context, info) => {
    const { user } = context;

    if (!user) {
      throw new GraphQLError('NOT_AUTHENTICATED', 'Foo');
    }

    return next(root, args, context, info);
  };
}
