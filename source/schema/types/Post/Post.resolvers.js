import mockedData from '@/data';

export default {
  Query: {
    posts() {
      return mockedData.posts;
    },
    post(root, { id }) {
      return mockedData.posts.find(post => post.id === id);
    }
  }
};
