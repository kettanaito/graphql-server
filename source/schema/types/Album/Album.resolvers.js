// @flow
import type { Artist } from '~/schema/types/Artist/Artist.types'
import type { Song } from '~/schema/types/Song/Song.types'
import type { Album } from './Album.types'
import { getThumbnailUrl } from '~/utils'

export default {
  Query: {
    album(album: Album, args, context): Album {
      return context.AlbumController.getById(args, context)
    },
    albums(album: Album, args, context): Album[] {
      return context.AlbumController.getAlbumsByArtist(args, context)
    },
  },
  Album: {
    artist(album: Album, args, context): Artist {
      return context.ArtistController.getById(album.artistId, context)
    },
    songs(album: Album, args, context): Song[] {
      return context.SongController.getByAlbumId(album.id, context)
    },
    thumbnail(album: Album, args, context): string {
      const { size, quality } = args
      return getThumbnailUrl(album.thumbnailBaseUrl, size, quality)
    },
  },
}
