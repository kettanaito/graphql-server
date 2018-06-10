// @flow
import { GraphQLSchema } from '~/classes'
import { SearchMediaType, SearchEntityType } from './enums'
import { Date, Email } from './scalars'
import { Query, Album, Artist, Song, Search } from './types'

const schema: GraphQLSchema = new GraphQLSchema({
  enums: [SearchMediaType, SearchEntityType],
  scalars: {
    Date,
    Email,
  },
  types: {
    Query,

    Search,
    Artist,
    Album,
    Song,
  },
})

export default schema
