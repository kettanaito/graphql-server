// @flow
import type { ValueNode } from 'graphql'
import { GraphQLScalarType } from 'graphql'
import gql from 'graphql-tag'
import { invariant } from '~/utils'

function validateDate(value: mixed) {
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
    parseLiteral({ value }: any) {
      return validateDate(value)
    }
  })
}
