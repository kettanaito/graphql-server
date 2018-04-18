// @flow
type TContext = any[]
type TRootInterface = {
  when: (permissionAssertion: TPermissionAssertion) => boolean
}
type TPermissionAssertion = (...context: TContext) => boolean

export default function permit(...context: TContext) {
  const interfaceDef: TRootInterface = {
    when: (permissionAssertion: TPermissionAssertion) =>
      _when(permissionAssertion, context)
  }

  return interfaceDef
}

function _when(permissionAssertion: TPermissionAssertion, context: TContext) {
  const isResolved = permissionAssertion(...context)

  return isResolved
    ? {
        and: function() {}
      }
    : {
        or: function() {}
      }
}

// usage
const user = { id: 1, role: 'admin' }
const isOwner = user => user.id === '1'
const isAdmin = user => user.role === 'admin'

const canQuery = permit(user)
  .when(isOwner)
  .and.when('logged')
  .or.when(isAdmin)
