// @flow
import type { Artist, ArtistResponse } from '~/schema/types/Artist/types'

export function normalizeArtist(res: ArtistResponse): Artist {
  return {
    id: res.artistId,
    name: res.artistName,
    genreId: res.collectionId,
    genreName: res.primaryGenreName
  }
}
