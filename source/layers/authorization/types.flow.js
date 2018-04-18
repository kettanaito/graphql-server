// @flow
import permissions from './permissions'

export type TPermission = permissions
export type TPermissionsGetter = (
  permissions: permissions
) => TPermission[] | TPermission
