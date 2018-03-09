import { ITypedef, IResolvers } from 'graphql-tools/dist/Interfaces';
import { invariant } from '@utils';

interface IGraphQLSchemaOptions {
  enums?: [ITypedef],
  scalars?: IEntityMap,
  types?: IEntityMap
}

interface IEntityMap {
  [entityName: string]: IEntity
}

interface IEntity {
  types: ITypedef,
  resolver: any
}

export default class GraphQLSchema {
  typeDefs: ITypedef[]
  resolvers: IResolvers[]

  constructor(options: IGraphQLSchemaOptions) {
    invariant(options, 'GraphQLSchema: Cannot create a schema with no options provided.');

    const { enums, scalars, types } = options;

    this.typeDefs = [];
    this.resolvers = [];

    this.applyTypeDef(enums);
    this.apply(scalars, 'scalar');
    this.apply(types, 'type');

    return this;
  }

  apply(entityMap: IEntityMap, entityType: string) {
    if (!entityMap) return;

    console.log({ entityMap })

    Object.keys(entityMap).forEach((entityName) => {
      const entityValue = entityMap[entityName];

      console.log({ entityValue });

      invariant(entityValue, 'GraphQLSchema: Failed to apply the %s `%s`. Expected entity to be an Object ' +
        'of { type, resolver } shape, but got: %s', entityType, entityName, entityValue);

      const { types, resolver } = entityValue;

      invariant(types, 'GraphQLSchema: Failed to apply the %s `%s`. Expected a valid type definition, but got: %s',
        entityType, entityName, types);
      invariant(resolver, 'GraphQLSchema: Failed to apply %s `%s`. Expected a valid resolver, but got: %s',
        entityType, entityName, resolver);

      this.applyTypeDef(types);
      this.resolvers.push(resolver);
    });

    return this;
  }

  applyTypeDef(typeDefs: ITypedef | [ITypedef]) {
    if (Array.isArray(typeDefs)) {
      this.typeDefs.push(...typeDefs)
    } else {
      this.typeDefs.push(typeDefs);
    }

    return this;
  }
}
