import { Controller } from '~/classes'
import { normalizeSearchResults } from './Search.normalize'

export default class SearchController extends Controller {
  searchUrl = 'https://itunes.apple.com/search'
  lookupUrl = 'https://itunes.apple.com/lookup'

  search({ media, entity, term, limit }) {
    const params = {
      url: this.searchUrl,
      query: {
        media,
        entity,
        term,
        limit
      },
      transformResponse(res) {
        console.log(res.results[0])
        return res.results.map(normalizeSearchResults)
      }
    }

    return this.request(params)
  }

  lookup({ id, entity, limit }) {
    const params = {
      url: this.lookupUrl,
      query: {
        id,
        entity,
        limit
      },
      transformResponse(res) {
        const json = res.results[0]
        return normalizeSearchResults(json)
      }
    }

    return this.request(params)
  }
}
