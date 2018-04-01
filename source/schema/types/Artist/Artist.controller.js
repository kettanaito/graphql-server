import { Controller } from '@classes'
import { normalizeArtist } from './selectors'

export default class ArtistController extends Controller {
  url = 'https://itunes.apple.com/lookup'

  getById(id) {
    const params = {
      url: this.url,
      query: {
        id
      },
      transformResponse(res) {
        return normalizeArtist(res.results[0])
      }
    }

    return this.request(params)
  }
}
