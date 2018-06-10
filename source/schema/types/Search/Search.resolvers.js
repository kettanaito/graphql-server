export default {
  Query: {
    search(root, args, context) {
      return context.SearchController.search(args)
    },
    lookup(root, args, context) {
      return context.SearchController.lookup(args)
    }
  }
}
