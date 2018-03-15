import { withAuthorization } from '@schema/middleware';

export default {
  password: withAuthorization(['PERMISSIONS_HERE'])((root, args, context, info) => {
    return root.password;
  })
};
