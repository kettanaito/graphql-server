import { ITypedef, IResolvers } from 'graphql-tools/dist/Interfaces';

interface IGraphQLSchemaOptions {
  enums?: IEntityMap,
  scalars?: IEntityMap,
  types?: IEntityMap
}

interface IEntityMap {
  [entityName: string]: IEntity
}

interface IEntity {
  type: ITypedef,
  resolver: any
}

export default class GraphQLSchema {
  typeDefs: ITypedef[]
  resolvers: IResolvers[]

  constructor(options: IGraphQLSchemaOptions) {
    const { enums, scalars, types } = options;

    this.apply(enums);
    this.apply(scalars);
    this.apply(types);

    return this;
  }

  apply(entityMap: IEntityMap) {
    if (!entityMap) return;

    Object.keys(entityMap).forEach((entityName) => {
      const { type, resolver } = entityMap[entityName];

      this.typeDefs.push(type);
      this.resolvers.push(resolver);
    });

    return this;
  }
}
