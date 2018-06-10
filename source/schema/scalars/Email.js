// @flow
import type { ValueNode } from 'graphql'
import { GraphQLScalarType } from 'graphql'
import gql from 'graphql-tag'
import isEmail from 'validator/lib/isEmail'
import { invariant } from '~/utils'

function validateEmail({ value }: { value: mixed }) {
  invariant(
    isEmail(value),
    'Invalid value for the `Email` scalar. Expected a valid email address, but got: %s',
    value,
  )
  return value
}

export default {
  types: gql`
    scalar Email
  `,
  resolver: new GraphQLScalarType({
    name: 'Email',
    description: 'E-mail address',
    serialize: validateEmail,
    parseValue: validateEmail,
    parseLiteral: validateEmail,
  }),
}
