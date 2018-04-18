import { withAuthorization } from '~/layers/authorization/middleware'

export default {
  User: {
    password() {
      const canQuery = permit(user).when(isOwner);

      return withAuthorization(canQuery)((root, args, context, info) => {
        return root.password
      })
    }
  },
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
  }
}
