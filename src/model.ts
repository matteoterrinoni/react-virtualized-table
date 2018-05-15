import { merge, deepCopy, orderBy } from './helpers'

const listRowHeight = 50
const codepickerHeight = 250
const codepickerWidth = 250
const paddingLeft = 15

const BASE_NAME = 'react-virtualized'

export type Item<T> = T & {
  visible?: boolean
  checked?: boolean
}

export type Column<T> = {
  title?: any
  name: string
  render: Render<T>
  fn?
  width?
  className?
  isActionsCol?: boolean
  onClick?
  style?
}

const asc = 'asc'
const desc = 'desc'

export const sortTypes = {
  asc: {
    key: asc,
    title: 'Asc',
    icon: 'arrow_drop_up'
  },
  desc: {
    key: desc,
    title: 'Desc',
    icon: 'arrow_drop_down'
  }
}

export type Sort = { [key: string]: string }

export type Render<T> = (value, item: Item<T>, x?) => any

export type Counter = {
  visible: number
  checked: number
}

export const initCounter = () => ({
  visible: 0,
  checked: 0
})

const getList = <T>(_items: Item<T>[], filter: string, matcher, counter: Counter) => {
  const match = <T>(i: Item<T>) =>
    (matcher ? matcher() : JSON.stringify(i).toLowerCase()).indexOf(filter) > -1
  _items.forEach((it, i) => {
    if (filter ? match(it) : true) {
      counter.visible++
      _items[i].visible = true
    } else {
      _items[i].visible = false
    }
    if (isChecked(it)) {
      counter.checked++
    }
  })
}

const sortItems = <T>(items: Item<T>[], sorting: Sort, columns: Column<T>[]) => {
  let _items = items
  givenColumns(columns)
    .sortables(sorting)
    .forEach(s => {
      const name = givenColumn(s).name()
      _items.sort((a, b) => s.fn(a[name] || a, b[name] || b))
      if (givenColumn(s).getSort(sorting) === desc) {
        _items = _items.reverse()
      }
    })
  return givenItems(_items)
}

const sortColumn = <T>(c: Column<T>, sorting: Sort) => {
  let sort = givenColumn(c).getSort(sorting)
  sorting[c.name] = sort === asc ? desc : asc
  if (sort === desc) {
    delete sorting[c.name]
  }
}

const getDefaultSorting = <T>(columns: Column<T>[]) => {
  let sorting = {}
  columns.some(c => {
    if (isSortable(c)) {
      sortColumn(c, sorting)
      return true
    }
    return false
  })
  return sorting
}

export const getColumnStyle = <T>(c: Column<T>) => {
  let style = c.style || {}
  if (c.width) style['maxWidth'] = c.width
  return style
}

const isVisible = <T>(i: Item<T>) => i.visible
const isChecked = <T>(i: Item<T>) => i.checked
const clean = <T>(i: Item<T>) => {
  i.checked && delete i.checked
  i.visible && delete i.visible
  return i
}

const isSortable = <T>(c: Column<T>, sorting?: Sort) =>
  c.fn && (sorting ? givenColumn(c).getSort(sorting) : true)

export const givenItems = <T>(items: Item<T>[]) => ({
  filter: (filter, matcher, counter) => getList(items, filter || '', matcher, counter),
  visibles: () => items.filter(isVisible),
  sort: (sorting: Sort, columns: Column<T>[]) => sortItems(items, sorting, columns),
  toggleCheck: val => items.map(i => givenItem(i).toggleCheck(val)),
  toggleCheckItem: (_i: Item<T>) =>
    givenItem((items as any).find(i => givenItem(i).equal(_i))).toggleCheck(),
  filterChecked: () => givenItems(items.filter(i => isChecked(i))),
  clean: () => givenItems(items.map(i => clean(i))),
  result: items
})

export const givenItem = <T>(i: Item<T>) => ({
  visible: () => isVisible(i),
  checked: () => isChecked(i),
  clean: () => clean(i),
  toggleCheck: (val?) => (i.checked = val !== undefined ? !val : !i.checked),
  equal: (_i: Item<T>) => !Object.keys(_i).find(k => i[k] !== _i[k])
})

export const givenColumns = <T>(columns: Column<T>[]) => ({
  getDefaultSorting: () => getDefaultSorting(columns),
  sortables: (sorting?: Sort) => columns.filter(c => isSortable(c, sorting))
})

export const givenColumn = <T>(c: Column<T>) => ({
  isSortable: (sorting?: Sort) => isSortable(c, sorting),
  sort: (sorting: Sort) => sortColumn(c, sorting),
  getSort: (sorting?: Sort) => sorting && sorting[c.name],
  name: () => c.name,
  getStyle: () => getColumnStyle(c)
})

export const Given = {
  items: givenItems,
  item: givenItem,
  column: givenColumn,
  columns: givenColumns
}

const CP = {
  list: {
    row_height: listRowHeight,
    ref: 'List',
    height: codepickerHeight,
    width: codepickerWidth
  },
  classNames: {
    wrapper: `${BASE_NAME}-wrapper`,
    main: BASE_NAME,
    container: `${BASE_NAME}-container`,
    head: 'list-head'
  },
  defaultContainerStyle: (height?: number) => ({
    height: height || 'auto'
  })
}

export default CP
