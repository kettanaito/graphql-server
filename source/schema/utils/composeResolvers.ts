import { IResolvers } from 'graphql-tools/dist/Interfaces';

type Resolvers = {
  root?: IResolvers,
  scalars?: IResolvers,
  extensions?: IResolvers
}

export default function composeResolvers(resolvers: Resolvers): IResolvers {
  return {
    ...resolvers.scalars,
    ...resolvers.root,
    ...resolvers.extensions
  };
}
