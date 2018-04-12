import { withAuthorization } from '~/schema/middleware'

export default {
  Query: {
    users(root, args, context) {
      return context.UserController.getUsers(args)
    },
    user(root, args, context) {
      return context.UserController.getUser(args)
    }
  },
  User: {
    password() {
      return withAuthorization(['PERMISSIONS_HERE'])(
        (root, args, context, info) => {
          return root.password
        }
      )
    }
  }
}
