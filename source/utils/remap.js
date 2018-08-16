// @flow
type TObject = {
  [propName: string]: mixed,
}

type TPropValueResolver = (origin: TObject) => mixed | string[] | string

type TTargetMap = {
  [propName: string]: TPropValueResolver,
}

type TOptions = {}

const resolveValue = (resolver: TPropValueResolver, origin: TObject) => {
  if (typeof resolver === 'function') {
    return resolver(origin)
  }

  if (Array.isArray(resolver)) {
    return resolver.reduce((res, targetPropName) => {
      return res || origin[targetPropName]
    }, null)
  }

  return origin[resolver]
}

export default function remap(map: TTargetMap, options?: TOptions): TObject {
  return (origin: TObject) => {
    return Object.keys(map).reduce((result, propName) => {
      const resolver = map[propName]

      return Object.assign({}, result, {
        [propName]: resolveValue(resolver, origin),
      })
    }, {})
  }
}
