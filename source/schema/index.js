import { DocumentNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from '@classes';

/* Enums */
import UserRole from './enums/UserRole.gql';

/* Scalars */
import { Date, Email } from './scalars';

/* Types */
import * as Query from './types/Query';
import * as User from './types/User';
import * as Post from './types/Post';

const schema = new GraphQLSchema({
  enums: [
    UserRole
  ],
  scalars: {
    Date,
    Email
  },
  types: {
    Query,
    Post,
    User
  }
});

export default makeExecutableSchema(schema);
