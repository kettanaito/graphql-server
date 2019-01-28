import { drop, map } from 'ramda'
import { Controller } from '~/classes'
import { arrayUtils } from '~/utils'
import { normalizeSong } from './Song.normalize'

export default class SongController extends Controller {
  static className = 'SongController'

  searchUrl = 'https://itunes.apple.com/search'
  normalizeSongs = map(normalizeSong)

  getByTerm({ term, first }) {
    const params = {
      url: this.searchUrl,
      query: {
        term,
      },
      transformResponse: (res) => {
        return this.normalizeSongs(res.results)
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
      transformResponse: (res) => {
        const songsJson = drop(1, res.results)
        return this.normalizeSongs(songsJson)
      },
    }

    return this.request(params)
  }
}
