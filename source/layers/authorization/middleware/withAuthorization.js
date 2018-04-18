// @flow
import type { TPermissionsGetter } from '../types.flow'
import { GraphQLError } from '~/classes'
import withAuthentication from '~/schema/middleware/withAuthentication'
import permissions from '../permissions'

/**
 * Resolves a field only when user matches the required permissions.
 */
export default function withAuthorization(
  permissionsGetter: TPermissionsGetter
) {
  const expectedPermissions = permissionsGetter(permissions)

  return (next: Function) => {
    return withAuthentication()((root, args, context, info) => {
      const { user } = context

      if (!user.permissions.includes(...expectedPermissions)) {
        throw new GraphQLError(
          'NOT_AUTHORIZED',
          'Cannot resolve query: not authorized'
        )
      }

      return next(root, args, context, info)
    })
  }
}
