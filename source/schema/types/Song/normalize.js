// @flow
import type { Song } from '~/schema/types/Song'

export function normalizeSong(res: any): Song {
  return {
    title: res.trackName,
    price: res.trackPrice,
    explicit: res.collectionExplicitness === 'explicit',
    artistId: res.artistId,
    country: res.country
  }
}
