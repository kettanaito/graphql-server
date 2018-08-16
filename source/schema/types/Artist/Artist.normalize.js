// @flow
import { compose } from 'ramda'
import { rename } from '~/utils'

export const normalizeArtist = compose(
  rename('artistId', 'id'),
  rename('artistName', 'name'),
  rename('primaryGenreId', 'genreId'),
  rename('primaryGenreName', 'genreName'),
)
