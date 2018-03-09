import { withAuthorization } from '@schema/middleware';

export default {
  password: withAuthorization(['PERMISSIONS_HERE'], (root) => root.password)
};
