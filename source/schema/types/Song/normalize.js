export const normalizeSong = res => ({
  ...res,
  title: res.trackName,
  price: res.trackPrice,
  explicit: res.collectionExplicitness === 'explicit'
})
