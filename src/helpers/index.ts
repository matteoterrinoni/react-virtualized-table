import * as _ from 'lodash'

export const merge = _.merge

export const deepCopy = _.cloneDeep

export const orderBy = _.orderBy

export const textComparison = (a, b, prop: (a: any) => any) => {
  const _a = JSON.stringify(prop(a))
    .toLowerCase()
    .trim()
  const _b = JSON.stringify(prop(b))
    .toLowerCase()
    .trim()
  return _a < _b ? -1 : _a > _b ? 1 : 0
}
