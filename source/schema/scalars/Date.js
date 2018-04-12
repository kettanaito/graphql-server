import { GraphQLScalarType } from 'graphql'
import gql from 'graphql-tag'
import { invariant } from '~/utils'

function validateDate(value) {
  // TODO Date validation?
  return value
}

export default {
  types: gql`
    scalar Date
  `,
  resolver: new GraphQLScalarType({
    name: 'Date',
    description: 'Date',
    serialize: validateDate,
    parseValue: validateDate,
    parseLiteral({ value }) {
      return validateDate(value)
    }
  })
}
