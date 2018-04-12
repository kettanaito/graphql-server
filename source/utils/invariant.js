// @flow
import util from 'util'

export default function invariant(
  predicate: any,
  message: string,
  ...args: any[]
) {
  if (predicate) return

  const error = new Error(util.format(message, ...args))
  error.name = 'Invariant violation'

  throw error
}
