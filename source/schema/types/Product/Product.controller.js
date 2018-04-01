import { Controller } from '@classes';

export default class ProductController extends Controller {
  getById(id) {
    return this.axios.get(`http://localhost:8001/restservices/PL/products/${id}`).then((res) => {
      return res.data.body;
    });
  }

  getProducts(ids) {
    return this.getMany(ids);
  }
}
