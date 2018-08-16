import { Controller } from '~/classes'
import { arrayUtils } from '~/utils'
import { normalizeSong } from './Song.normalize'

export default class SongController extends Controller {
  url = 'https://itunes.apple.com/search'

  getByTerm({ term, first }) {
    const params = {
      url: this.url,
      query: {
        term,
      },
      transformResponse(res) {
        return res.results.map(normalizeSong)
      },
    }

    return this.request(params)
  }

  getByAlbumId(albumId, context) {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id: albumId,
        entity: 'song',
      },
      transformResponse(res) {
        console.log('\n\ngetByAlbumId res:', res)
        const slicedResults = res.results.slice(1, res.results.length)
        return slicedResults.map(normalizeSong)
      },
    }

    return this.request(params)
  }
}
