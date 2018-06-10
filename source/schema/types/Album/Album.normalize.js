export const normalizeAlbum = res => ({
  id: res.collectionId,
  artistId: res.artistId,
  title: res.collectionName,
  releaseDate: res.releaseDate,
  explicit: res.collectionExplicitness === 'explicit',
  price: res.collectionPrice,
  trackCount: res.trackCount,
  country: res.country,
  thumbnailBaseUrl: res.artworkUrl100,
  copyright: res.copyright,
})
