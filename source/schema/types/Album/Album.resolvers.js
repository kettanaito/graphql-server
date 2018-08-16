// @flow
import type { Artist } from '~/schema/types/Artist/Artist.types'
import type { Song } from '~/schema/types/Song/Song.types'
import type { Album } from './Album.types'
import { getThumbnailUrl } from '~/utils'

export default {
  Query: {
    album(album: Album, args, context): Album {
      return context.AlbumController.getById({ id: args.id, context })
    },
    albums(album: Album, args, context): Album[] {
      return context.AlbumController.getAlbumsByArtist({
        artistId: args.artistId,
        context,
      })
    },
  },
  Album: {
    artist(album: Album, args, context): Artist {
      return context.ArtistController.getById({
        artistId: album.artistId,
        context,
      })
    },
    songs(album: Album, args, context): Song[] {
      return context.SongController.getByAlbumId({ albumId: album.id, context })
    },
    thumbnail(album: Album, args, context): string {
      return getThumbnailUrl({
        originUrl: album.thumbnailBaseUrl,
        size: args.size,
        quality: args.quality,
      })
    },
  },
}
