export default {
  Artist: {
    coverImageUrl(artist, args, context) {
      return context.ArtistController.getCoverImageUrl(artist, args, context)
    },
    albums(artist, args, context) {
      return context.AlbumController.getAlbumsByArtist(
        {
          artistId: artist.id,
          limit: args.limit,
        },
        context,
      )
    },
  },
  Query: {
    artist(artist, args, context) {
      return args.id
        ? context.ArtistController.getById(args.id, context)
        : context.ArtistController.getBySlug(args, context)
    },
  },
}
