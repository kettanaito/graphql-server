// @flow
import { compose } from 'ramda'
import rename from './rename'

type ValueTransformer = (value: mixed, obj: Object) => any

type RenameWith = (
  fromKey: string,
  toKey: string,
  valueTransformer: ValueTransformer,
) => Object

const renameWith: RenameWith = (fromKey, toKey, valueTransformer) =>
  compose(
    (obj) => ({
      ...obj,
      [toKey]: valueTransformer(obj[toKey]),
    }),
    rename(fromKey, toKey),
  )

export default renameWith
