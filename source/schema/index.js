// @flow
import { GraphQLSchema } from '~/classes'
import { UserRole } from './enums'
import { Date, Email } from './scalars'
import { Query, User, Post, Artist, Song } from './types'

const schema: GraphQLSchema = new GraphQLSchema({
  enums: [UserRole],
  scalars: {
    Date,
    Email
  },
  types: {
    Query,
    Post,
    User,

    Artist,
    Song
  }
})

export default schema
