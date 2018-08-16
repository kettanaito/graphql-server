export default {
  Query: {
    search(searchResults, args, context) {
      return context.SearchController.search(args)
    },
    lookup(searchResults, args, context) {
      return context.SearchController.lookup(args)
    },
  },
}
