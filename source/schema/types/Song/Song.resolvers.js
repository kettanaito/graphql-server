export default {
  Query: {
    search(root, args, context) {
      return context.SongController.getByTitle(args);
    }
  },
  Song: {
    artist(root, args, context) {
      return context.ArtistController.getById(root.artistId);
    }
  }
};
