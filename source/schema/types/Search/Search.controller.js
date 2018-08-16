// @flow
import { head, map } from 'ramda'
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
        limit,
      },
      transformResponse: (res) => {
        return map(normalizeSearchResults, res.results)
      },
    }

    return this.request(params)
  }

  lookup({ id, entity, limit }) {
    const params = {
      url: this.lookupUrl,
      query: {
        id,
        entity,
        limit,
      },
      transformResponse: (res) => {
        const resultJson = head(res.results)
        return normalizeSearchResults(resultJson)
      },
    }

    return this.request(params)
  }
}
