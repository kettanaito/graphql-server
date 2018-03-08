import invariant from 'invariant';
import isEmail from 'validator/lib/isEmail';
import { GraphQLScalarType, StringValueNode } from 'graphql';
import gql from 'graphql-tag';

function validateEmail(value: string) {
  invariant(isEmail(value), 'Invalid value for "Email" scalar. Expected a valid email, but got %s', value);
  return value;
}

export default {
  type: gql`
    scalar Email
  `,
  resolver: new GraphQLScalarType({
    name: 'Email',
    description: 'E-mail address',
    serialize: validateEmail,
    parseValue: validateEmail,
    parseLiteral: ({ value }: StringValueNode) => validateEmail(value)
  })
};
