export default {
  Query: {
    product(root, args, context) {
      return context.ProductController.getById(args.id);
    },
    products(root, args, context) {
      return context.ProductController.getProducts(args.ids);
    }
  }
};
