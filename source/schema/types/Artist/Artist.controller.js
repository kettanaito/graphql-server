// @flow
import { Controller } from '~/classes'
import { normalizeArtist } from './normalize'

export default class ArtistController extends Controller {
  url = 'https://itunes.apple.com/lookup'

  getById(id: string) {
    const params = {
      url: this.url,
      query: {
        id,
        entity: 'musicArtist'
      },
      transformResponse(res) {
        const artistJson = res.results[0]
        return normalizeArtist(artistJson)
      }
    }

    return this.request(params)
  }
}
