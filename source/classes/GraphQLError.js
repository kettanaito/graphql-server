import ExtendableError from 'extendable-error';

export default class GraphQLError extends ExtendableError {
  constructor(errorCode, message) {
    super(message);
    this.errorCode = errorCode;
  }

  serialize(originalError) {
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