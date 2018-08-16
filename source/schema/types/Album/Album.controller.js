// @flow
import type { Album } from './Album.types'
import { head, drop, map } from 'ramda'
import { Controller } from '~/classes'
import { normalizeAlbum } from './Album.normalize'

export default class AlbumController extends Controller {
  getById({ id }, context): Album {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id,
        limit: 1,
      },
      transformResponse: (res) => {
        const albumJson = head(res.results)
        return normalizeAlbum(albumJson)
      },
    }

    return this.request(params)
  }

  getAlbumsByArtist({ artistId, entity = 'album', limit }, context): Album[] {
    const params = {
      url: context.SearchController.lookupUrl,
      query: {
        id: artistId,
        entity,
        limit,
      },
      transformResponse: (res) => {
        const albumsJson = drop(1, res.results)
        return map(normalizeAlbum, albumsJson)
      },
    }

    return this.request(params)
  }
}
