import { getThumbnailUrl } from '~/utils'

export default {
  Query: {
    album(album, args, context) {
      return context.AlbumController.getById(args, context)
    },
    albums(album, args, context) {
      return context.AlbumController.getAlbumsByArtist(args, context)
    },
  },
  Album: {
    artist(album, args, context) {
      return context.ArtistController.getById(album.artistId, context)
    },
    songs(album, args, context) {
      return context.SongController.getByAlbumId(album.id, context)
    },
    thumbnail(album, args, context) {
      const { size, quality } = args
      return getThumbnailUrl(album.thumbnailBaseUrl, size, quality)
    },
  },
}
