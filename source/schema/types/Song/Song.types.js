// @flow
import type { Artist } from '~/schema/types/Artist/types'

export type Song = {
  title: string,
  price?: number,
  explicit?: boolean,
  releaseDate?: Date,
  artistId: number,
  artist?: Artist,
  country?: string,
}

/**
 * @external
 */
export type SongResponse = {
  trackName: string,
  trackPrice: number,
  explicit: boolean,
  artistId: number,
  country: string,
}
