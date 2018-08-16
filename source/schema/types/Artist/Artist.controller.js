// @flow
import type { Artist } from './Artist.types'
import { head } from 'ramda'
import metafetch from 'metafetch'
import { Controller } from '~/classes'
import { getThumbnailUrl } from '~/utils'
import { normalizeArtist } from './Artist.normalize'

export default class ArtistController extends Controller {
  getById({ id, context }): Artist {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id,
        entity: 'musicArtist',
      },
      transformResponse: (res) => {
        const artistJson = head(res.results)
        return normalizeArtist(artistJson)
      },
    }

    return this.request(params)
  }

  getBySlug({ slug, context }): Artist {
    const params = {
      url: context.SearchController.searchUrl,
      query: {
        term: slug,
        entity: 'musicArtist',
        limit: 1,
      },
      transformResponse: (res) => {
        const artistJson = head(res.results)
        return normalizeArtist(artistJson)
      },
    }

    return this.request(params)
  }

  getCoverImageUrl({ pageUrl, size, quality, context }): string {
    return new Promise((resolve, reject) => {
      metafetch.fetch(pageUrl, (error, meta) => {
        if (error) {
          return reject(error)
        }

        const imageUrl = getThumbnailUrl({
          originUrl: meta.image,
          size,
          quality,
        })

        return resolve(imageUrl)
      })
    })
  }
}
