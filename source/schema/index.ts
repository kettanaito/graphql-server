import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from '@classes';
import composeResolvers from './utils/composeResolvers';

import * as enums from './enums';
import * as scalars from './scalars';
import * as User from './types/User';

const schema = new GraphQLSchema({
  enums,
  scalars,
  types: {
    User
  }
});

export default makeExecutableSchema(schema);
