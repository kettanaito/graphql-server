// @flow
/**
 * Artist entity types based on GraphQL type definition.
 */
export type Artist = {
  id: number,
  name: string,
  genreId: number,
  genreName: string,
}

/**
 * @external
 * Response type of the Artist object.
 */
export type ArtistResponse = {
  artistId: number,
  artistName: string,
  collectionId: number,
  primaryGenreName: string,
  primaryGenreId: number,
}
