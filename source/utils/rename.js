// @flow
import { curry, omit } from 'ramda'

type Rename = (fromKey: string, toKey: string) => Object

export const rename: Rename = curry((fromKey, toKey, obj) => ({
  ...omit([fromKey], obj),
  [toKey]: obj[fromKey],
}))

export default rename
