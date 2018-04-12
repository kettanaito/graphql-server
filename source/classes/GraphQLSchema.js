// @flow
import type { DocumentNode } from 'graphql'
import type { ITypedef } from 'graphql-tools/dist/Interfaces'
import Controller from './Controller'
import { isset, invariant } from '~/utils'

type TSchemaEntity = {
  types: DocumentNode,
  resolvers: Object,
  controller: Controller
}

type TSchemaEntityMap = {
  [entityName: string]: TSchemaEntity
}

type TSchemaOptions = {
  enums?: DocumentNode[],
  scalars?: TSchemaEntityMap,
  types?: TSchemaEntityMap
}

export default class GraphQLSchema {
  typeDefs: ITypedef[]
  resolvers: Object[]
  context: Object

  constructor(options: TSchemaOptions) {
    invariant(
      options,
      'GraphQLSchema: Cannot create a schema with no options provided.'
    )

    const { enums, scalars, types } = options

    this.typeDefs = []
    this.resolvers = []
    this.context = {}

    if (enums) this.applyTypeDef(enums)
    if (scalars) this.apply(scalars, 'scalar')
    if (types) this.apply(types, 'type')

    return this
  }

  apply(entityMap: TSchemaEntityMap, entityType: string) {
    Object.keys(entityMap).forEach(entityName => {
      const entityValue: TSchemaEntity = entityMap[entityName]

      invariant(
        entityValue,
        'GraphQLSchema: Failed to apply the %s `%s`. Expected entity to be an Object ' +
          'of { type, resolvers, controller } shape, but got: %s',
        entityType,
        entityName,
        entityValue
      )

      const { types, resolvers, controller } = entityValue

      invariant(
        types,
        'GraphQLSchema: Failed to apply the %s `%s`. Expected a valid type definition, but got: %s',
        entityType,
        entityName,
        types
      )

      this.applyTypeDef(types)

      if (resolvers) {
        this.resolvers.push(resolvers)
      }

      if (controller) {
        this.context[controller.name] = new controller()
      }
    })

    return this
  }

  applyTypeDef(typeDefs?: ITypedef | ITypedef[]) {
    if (!isset(typeDefs)) {
      return this
    }

    if (Array.isArray(typeDefs)) {
      this.typeDefs.push(...typeDefs)
    } else {
      this.typeDefs.push(typeDefs)
    }

    return this
  }
}
