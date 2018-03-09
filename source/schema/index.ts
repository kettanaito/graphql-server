import { DocumentNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from '@classes';

/* Enums */
import UserRole from './enums/UserRole.gql';

/* Scalars */
import { Email } from './scalars';

/* Types */
import * as RootQuery from './types/RootQuery';
import * as User from './types/User';

console.log({ UserRole });

const schema = new GraphQLSchema({
  enums: [
    UserRole
  ],
  scalars: {
    Email
  },
  types: {
    RootQuery,
    User
  }
});

export default makeExecutableSchema(schema);
