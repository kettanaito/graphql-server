export function normalizeSong(song) {
  return {
    ...song,
    title: song.trackName,
    price: song.trackPrice,
    explicit: song.collectionExplicitness === 'explicit'
  }
}
