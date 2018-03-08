import ExtendableError from 'extendable-error';
import { GraphQLError as NativeGraphQLError } from 'graphql';

export default class GraphQLError extends ExtendableError {
  errorCode: string

  constructor(errorCode: string, message:string) {
    super(message);
    this.errorCode = errorCode;
  }

  serialize(originalError: NativeGraphQLError) {
    const { errorCode, message } = this;
    const { locations, path } = originalError;

    return {
      errorCode,
      message,
      locations,
      path
    };
  }
}