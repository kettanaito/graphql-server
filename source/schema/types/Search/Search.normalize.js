// import { compose } from 'ramda'
// import { rename } from '~/utils'

export const normalizeSearchResults = (res) => {
  return {
    id: res.trackId || res.collectionId,
    title: res.trackName || res.collectionName,
    artistId: res.artistId,
    country: res.country,
  }
}
