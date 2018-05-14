import { initCounter, Item, Given, Sort, sortTypes, Column } from '../src/model'

import { FakeItem, initFakeItems, fakeItem, fakeItemColumns } from './utils'

const testname = 'mytestName'

describe('Method over lists', () => {
  it('When init the counter each element as a value of zero ', () => {
    const counter = initCounter()
    const lengthOfElementsHigherThanZero = Object.keys(counter).filter(k => counter[k] > 0).length
    expect(lengthOfElementsHigherThanZero === 0).toBeTruthy()
  })

  it('When get a list with one item checked it returns a Counter object with the right count', () => {
    let counter = initCounter()

    let items = initFakeItems(10) as Item<FakeItem>[]

    items[0].checked = true

    Given.items(items).filter('', null, counter)

    expect(counter.checked === 1).toBeTruthy()
  })

  it('filter correctly', () => {
    let counter = initCounter()

    let items = initFakeItems(10) as Item<FakeItem>[]
    items.push(fakeItem(items[0]).withName(testname).result)

    Given.items(items).filter(testname, null, counter)
    expect(counter.visible === 0).toBeTruthy()

    Given.items(items).filter(testname.toLowerCase(), null, counter)
    expect(counter.visible === 1).toBeTruthy()
  })

  it('sort correctly', () => {
    let counter = initCounter()

    let items = initFakeItems(2) as Item<FakeItem>[]
    items[0] = fakeItem(items[0]).withName('A').result
    items[1] = fakeItem(items[1]).withName('B').result

    const sortedDesc = Given.items(items).sort({ name: 'desc' }, fakeItemColumns).result
    expect(sortedDesc[0].name === 'B').toBeTruthy()

    const sortedAsc = Given.items(items).sort({ name: 'asc' }, fakeItemColumns).result
    expect(sortedAsc[0].name === 'A').toBeTruthy()
  })

  it('sorting the column will change correctly the Sort model', () => {
    let sorting: Sort = {}

    Given.column(fakeItemColumns[0]).sort(sorting)
    expect(sorting[fakeItemColumns[0].name] === sortTypes.asc.key).toBeTruthy()

    Given.column(fakeItemColumns[0]).sort(sorting)
    expect(sorting[fakeItemColumns[0].name] === sortTypes.desc.key).toBeTruthy()

    Given.column(fakeItemColumns[0]).sort(sorting)
    expect(sorting[fakeItemColumns[0].name] === undefined).toBeTruthy()
  })

  it('default sorting will setup correctly the Sort model', () => {
    let columns: Column<FakeItem>[] = [
      {
        name: 'name',
        render: v => v,
        fn: (a, b) => null
      },
      {
        name: 'age',
        render: v => v
      },
      {
        name: 'email',
        render: v => v,
        fn: (a, b) => null
      }
    ]

    const sortingByName: Sort = Given.columns(columns).getDefaultSorting()
    expect(sortingByName['name'] === sortTypes.asc.key).toBeTruthy()

    delete columns[0].fn
    const sortingByEmail: Sort = Given.columns(columns).getDefaultSorting()
    expect(sortingByEmail['email'] === sortTypes.asc.key).toBeTruthy()
  })

  it('clean is cleaning items from other info', () => {
    let counter = initCounter()
    let items = initFakeItems(10) as Item<FakeItem>[]
    items[0] = fakeItem(items[0]).withName(testname).result
    items[0].checked = true
    Given.items(items).filter(testname.toLowerCase(), null, counter)

    expect(items[0].checked === true).toBeTruthy()
    expect(items[0].visible === true).toBeTruthy()

    const cleanedItems = Given.items(items).clean().result
    expect(items[0].checked !== true).toBeTruthy()
    expect(items[0].visible !== true).toBeTruthy()
  })
})
