import jwt from 'jsonwebtoken'
import { Controller } from '~/classes'
import mockedData from '~/data'

export default class UserController extends Controller {
  login(args) {
    const { email, password } = args
    console.log('should log in with', email, password)

    // 1. query for user with the provided email
    // 2. check whether the user is present
    // 3. if yes, compare encoded password from db with the provided password (bencrypt?)
    // 4. if match, send the token

    const token = jwt.sign(
      {
        role: 'EDITOR'
      },
      (secret: 'foo')
    )

    return {
      token,
      firstName: 'John',
      lastName: 'Maverick'
    }
  }

  getUsers(args) {
    return mockedData.users.filter(user => {
      return Object.keys(args).map(argName => user[argName] === args[argName])
    })
  }

  getUser(args) {
    return this.get(args)
    // return mockedData.users.find(user => user.id === args.id);
  }
}
