import { GraphQLSchema } from '@classes';

/* Enums */
import { UserRole } from './enums';

/* Scalars */
import { Date, Email } from './scalars';

/* Types */
import { Query, User, Post, Product, Artist, Song } from './types';

export default new GraphQLSchema({
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
    User,
    Product,

    Artist,
    Song
  }
});
