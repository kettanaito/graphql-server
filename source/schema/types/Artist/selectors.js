export function normalizeArtist(artist) {
  return {
    ...artist,
    id: artist.artistId,
    name: artist.artistName,
    genreId: artist.primaryGenreId,
    genreName: artist.primaryGenreName
  }
}
