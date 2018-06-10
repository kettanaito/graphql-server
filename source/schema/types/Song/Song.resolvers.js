export default {
  Query: {
    songs(root, args, context) {
      return context.SongController.getByAlbumId(args.albumId, context)
    },
  },
  Song: {
    artist(root, args, context) {
      return context.ArtistController.getById(root.artistId, context)
    },
  },
}
