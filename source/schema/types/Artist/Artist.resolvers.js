export default {
  Artist: {
    coverImageUrl(root, args, context) {
      return context.ArtistController.getCoverImageUrl(root, args, context)
    },
  },
  Query: {
    artist(root, args, context) {
      return args.id
        ? context.ArtistController.getById(args.id, context)
        : context.ArtistController.getBySlug(args, context)
    },
  },
}
