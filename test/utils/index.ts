import * as faker from 'faker'

import { VTableColumn } from '../../src/react-virtualized-table'

export const textComparison = (a, b, prop: (a: any) => any) => {
  const _a = JSON.stringify(prop(a))
    .toLowerCase()
    .trim()
  const _b = JSON.stringify(prop(b))
    .toLowerCase()
    .trim()
  return _a < _b ? -1 : _a > _b ? 1 : 0
}

export type FakeItem = {
  name: string
  age: number
  email: string
}

export const initFakeItems = (n: number = 1000) => {
  let list: FakeItem[] = []

  for (let i = 0; i < n; i++) {
    list.push(fakeItem().random().result)
  }

  return list
}

export const fakeItem = (_f?: FakeItem) => {
  let f = _f || ({} as FakeItem)
  return {
    withName: (name: string) => fakeItem({ ...f, name }),

    withAge: (age: number) => fakeItem({ ...f, age }),

    withEmail: (email: string) => fakeItem({ ...f, email }),

    random: () =>
      fakeItem({
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: faker.random.number()
      }),

    result: f
  }
}

export const sortableFakeItemColumn = {
  name: 'name',
  render: v => v,
  fn: (a, b) => textComparison(a, b, o => o)
}

export const unsortableFakeItemColumn = {
  name: 'age',
  render: v => v
}

export const fakeItemColumns: VTableColumn<FakeItem>[] = [
  {
    name: 'name',
    render: v => v,
    fn: (a, b) => textComparison(a, b, o => o)
  },
  {
    name: 'age',
    render: v => v
  },
  {
    name: 'email',
    render: v => v,
    fn: (a, b) => textComparison(a, b, o => o)
  }
]
