// @flow
import metafetch from 'metafetch'
import { Controller } from '~/classes'
import { normalizeArtist } from './Artist.normalize'
import { formatThumbnailUrl } from '~/utils'

export default class ArtistController extends Controller {
  getById(id, context) {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id,
        entity: 'musicArtist',
      },
      transformResponse(res) {
        const artistJson = res.results[0]
        console.log('artistJson:', artistJson)
        return normalizeArtist(artistJson)
      },
    }

    return this.request(params)
  }

  getBySlug({ slug }, context: Object) {
    const params = {
      url: context.SearchController.searchUrl,
      query: {
        term: slug,
        entity: 'musicArtist',
        limit: 1,
      },
      transformResponse(res) {
        console.log('res:', res)

        const norm = normalizeArtist(res.results[0])

        console.log('norm:', norm)
        return norm
      },
    }

    return this.request(params)
  }

  getCoverImageUrl(root, args) {
    return new Promise((resolve, reject) => {
      const { artistLinkUrl } = root

      metafetch.fetch(artistLinkUrl, function(error, meta) {
        if (error) {
          return reject(error)
        }

        const { image } = meta
        const { size, quality } = args
        const imageUrl = getThumbnailUrl(image, size, quality)

        return resolve(imageUrl)
      })
    })
  }
}
