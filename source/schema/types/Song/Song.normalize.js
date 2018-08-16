// @flow
import { compose } from 'ramda'
import { rename, renameWith } from '~/utils'

export const normalizeSong = compose(
  rename('trackId', 'id'),
  rename('collectionId', 'albumId'),
  rename('trackName', 'title'),
  rename('trackPrice', 'price'),
  rename('trackTimeMillis', 'duration'),
  rename('collectionPrice', 'price'),
  renameWith(
    'collectionExplicitness',
    'explicit',
    (value) => value === 'explicit',
  ),
)
