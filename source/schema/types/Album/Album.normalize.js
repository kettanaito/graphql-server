// @flow
import { compose } from 'ramda'
import { rename, renameWith } from '~/utils'

export const normalizeAlbum = compose(
  rename('collectionId', 'id'),
  rename('collectionName', 'title'),
  rename('collectionPrice', 'price'),
  rename('artworkUrl100', 'thumbnailBaseUrl'),
  renameWith(
    'collectionExplicitness',
    'explicit',
    (value) => value === 'explicit',
  ),
)
