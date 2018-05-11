import * as faker from 'faker'

export type FakeItem = {
  name: string
  age: number
  email: string
}

export const initFakeItems = (n: number = 1000) => {
  let list: FakeItem[] = []

  for (let i = 0; i < n; i++) {
    list.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.random.number()
    })
  }

  return list
}

export const textComparison = (a, b, prop: (a: any) => any) => {
  const _a = JSON.stringify(prop(a))
    .toLowerCase()
    .trim()
  const _b = JSON.stringify(prop(b))
    .toLowerCase()
    .trim()
  return _a < _b ? -1 : _a > _b ? 1 : 0
}
