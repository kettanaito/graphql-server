import { Controller } from '~/classes'
import mockedData from '~/data'

export default class PostController extends Controller {
  getPosts(args) {
    return mockedData.posts.filter(post => {
      return Object.keys(args).map(argName => post[argName] === args[argName])
    })
  }

  getPost(args) {
    return mockedData.posts.find(post => post.id === args.id)
  }
}
