export default {
  Query: {
    search(root, args, context) {
      return context.SongController.getByTerm(args)
    }
  }
}
