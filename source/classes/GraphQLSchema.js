import { invariant } from '@utils';

export default class GraphQLSchema {
  constructor(options) {
    invariant(options, 'GraphQLSchema: Cannot create a schema with no options provided.');

    const { enums, scalars, types } = options;

    this.typeDefs = [];
    this.resolvers = [];
    this.context = {};

    this.applyTypeDef(enums);
    this.apply(scalars, 'scalar');
    this.apply(types, 'type');

    return this;
  }

  apply(entityMap, entityType) {
    if (!entityMap) return;

    Object.keys(entityMap).forEach((entityName) => {
      const entityValue = entityMap[entityName];

      invariant(entityValue, 'GraphQLSchema: Failed to apply the %s `%s`. Expected entity to be an Object ' +
        'of { type, resolver } shape, but got: %s', entityType, entityName, entityValue);

      const { types, resolvers, controller } = entityValue;

      invariant(types, 'GraphQLSchema: Failed to apply the %s `%s`. Expected a valid type definition, but got: %s',
        entityType, entityName, types);

      this.applyTypeDef(types);

      if (resolvers) {
        this.resolvers.push(resolvers);
      }

      if (controller) {
        this.context[controller.name] = new controller();
      }
    });

    return this;
  }

  applyTypeDef(typeDefs) {
    if (Array.isArray(typeDefs)) {
      this.typeDefs.push(...typeDefs)
    } else {
      this.typeDefs.push(typeDefs);
    }

    return this;
  }
}
