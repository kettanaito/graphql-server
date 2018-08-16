import { getThumbnailUrl } from '~/utils'

export default {
  Query: {
    album(root, args, context) {
      return context.AlbumController.getById(args, context)
    },
    albums(root, args, context) {
      return context.AlbumController.getAlbumsByArtist(args, context)
    },
  },
  Album: {
    artist(root, args, context) {
      return context.ArtistController.getById(root.artistId, context)
    },
    songs(root, args, context) {
      return context.SongController.getByAlbumId(root.id, context)
    },
    thumbnail(root, args, context) {
      const { size, quality } = args
      return getThumbnailUrl(root.thumbnailBaseUrl, size, quality)
    },
  },
}
