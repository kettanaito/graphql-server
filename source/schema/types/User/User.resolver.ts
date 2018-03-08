import { withAuthorization } from '@middleware';

export default {
  password: withAuthorization(['PERMISSIONS_HERE'], (root) => root.password)
};
