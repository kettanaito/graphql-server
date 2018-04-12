export default {
  Post: {
    author(root, args, context) {
      return context.UserController.getUser({ id: root.authorId })
    }
  },
  Query: {
    posts(root, args, context) {
      return context.PostController.getPosts(args)
    },
    post(root, args, context) {
      return context.PostController.getPost(args)
    }
  }
}
