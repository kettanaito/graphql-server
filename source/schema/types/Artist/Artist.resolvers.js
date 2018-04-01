export default {
  Query: {
    artist(root, args, context) {
      return context.ArtistController.getById(args.id);
    }
  }
};
