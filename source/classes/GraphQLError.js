// @flow
import ExtendableError from 'extendable-error'

export default class GraphQLError extends ExtendableError {
  constructor(errorCode: string, message: string) {
    super(message)
    this.errorCode = errorCode
  }

  serialize(originalError: GraphQLError) {
    const { errorCode, message } = this
    const { locations, path } = originalError

    return {
      errorCode,
      message,
      locations,
      path
    }
  }
}
