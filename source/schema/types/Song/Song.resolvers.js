export default {
  Query: {
    songs(song, args, context) {
      return context.SongController.getByAlbumId(args.albumId, context)
    },
  },
  Song: {
    artist(song, args, context) {
      return context.ArtistController.getById(song.artistId, context)
    },
  },
}
