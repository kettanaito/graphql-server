export default {
  Song: {
    artist(root, args, context) {
      return context.ArtistController.getById(root.artistId)
    }
  }
}
