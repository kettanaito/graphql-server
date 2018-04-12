export default {
  users: [
    {
      id: 1,
      role: 'VISITOR',
      firstName: 'John',
      lastName: 'Maverick',
      email: 'john.maverick@email.com',
      password: 'Secret!'
    }
  ],
  posts: [
    {
      id: 1,
      authorId: 1,
      title: 'Lorem ipsum dolor sit amet'
    },
    {
      id: 2,
      authorId: 1,
      title: 'A GraphQL fairytale'
    }
  ]
}
