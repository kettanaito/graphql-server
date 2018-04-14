// @flow
import type { Song, SongResponse } from '~/schema/types/Song/types'

export function normalizeSong(res: SongResponse): Song {
  return {
    title: res.trackName,
    price: res.trackPrice,
    explicit: res.collectionExplicitness === 'explicit',
    artistId: res.artistId,
    country: res.country
  }
}
