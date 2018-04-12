import { Controller } from '~/classes'
import { normalizeSong } from './normalize'
import { arrayUtils } from '~/utils'

export default class SongController extends Controller {
  url = 'https://itunes.apple.com/search'

  getByTerm({ term, first }) {
    const params = {
      url: this.url,
      query: {
        term
      },
      transformResponse(res) {
        return res.results.map(normalizeSong)
      }
    }

    return this.request(params)
  }
}
