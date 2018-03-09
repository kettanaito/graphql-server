import mockedData from '@/data';

export default {
  /* User */
  users: () => {
    return mockedData.users;
  },
  user: (root, { id }) => {
    return mockedData.users.find(user => user.id === id);
  },

  /* Post */
  posts: () => {
    return mockedData.posts;
  },
  post: (root, { id }) => {
    return mockedData.posts.find(post => post.id === id);
  }
};
