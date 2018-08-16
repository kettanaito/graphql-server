import { Controller } from '~/classes'
import { normalizeAlbum } from './Album.normalize'

export default class AlbumController extends Controller {
  getById({ id }, context) {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id,
        limit: 1,
      },
      transformResponse(res) {
        return normalizeAlbum(res.results[0])
      },
    }

    return this.request(params)
  }

  getAlbumsByArtist({ artistId, entity = 'album', limit }, context) {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id: artistId,
        entity,
        limit,
      },
      transformResponse(res) {
        const albumsJson = res.results && res.results.slice(1)
        return albumsJson.map(normalizeAlbum)
      },
    }

    return this.request(params)
  }
}
