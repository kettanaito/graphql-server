export const normalizeArtist = res => ({
  id: res.artistId,
  name: res.artistName,
  genreId: res.collectionId,
  genreName: res.primaryGenreName
})
