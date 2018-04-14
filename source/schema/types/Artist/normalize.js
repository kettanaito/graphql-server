// @flow
import type { Artist } from '~/schema/types/Artist'

export function normalizeArtist(res: any): Artist {
  return {
    id: res.artistId,
    name: res.artistName,
    genreId: res.collectionId,
    genreName: res.primaryGenreName
  }
}
