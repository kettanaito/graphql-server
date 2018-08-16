// @flow
import type { Artist } from '~/schema/types/Artist/Artist.types'
import type { Song } from '~/schema/types/Song/Song.types'

export type Album = {
  id: number,
  title: string,
  releaseDate: Date,
  explicit: boolean,
  trackCount: number,
  thumbnailBaseUrl: string,
  country: string,
  copyright: string,

  artistId: string,
  artist: Artist,
  songs: Song[],
}
