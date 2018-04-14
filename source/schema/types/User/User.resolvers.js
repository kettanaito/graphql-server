import { withAuthorization } from '~/schema/middleware'

export default {
  Query: {
    login(root, args, context) {
      return context.UserController.login(args)
    },
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
