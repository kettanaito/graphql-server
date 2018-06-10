// @flow
import type { Song, SongResponse } from '~/schema/types/Song/types'

export function normalizeSong(res: SongResponse): Song {
  return {
    id: res.trackId,
    trackNumber: res.trackNumber,
    title: res.trackName,
    price: res.trackPrice,
    duration: res.trackTimeMillis,
    explicit: res.collectionExplicitness === 'explicit',
    artistId: res.artistId,
    albumId: res.collectionId,
    price: res.collectionPrice,
    country: res.country,
  }
}
