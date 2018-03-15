import { withAuthorization } from '@schema/middleware';
import mockedData from '@/data';

export default {
  Query: {
    users() {
      return mockedData.users;
    },
    user(root, { id }) {
      return mockedData.user.find(user => user.id === id);
    }
  },
  User: {
    password() {
      return withAuthorization(['PERMISSIONS_HERE'])((root, args, context, info) => {
        return root.password;
      });
    }
  }
};
