import { merge, deepCopy, orderBy, textComparison } from './helpers'

import SF from 'src/searchfield/model'

import I from 'src/icon/model'

import C from 'src/checkbox/model'

import F from 'src/filtered/model'

import { VTable, Props as VProps, State as VState } from 'src'

const listRowHeight = 50
const codepickerHeight = 250
const codepickerWidth = 250
const paddingLeft = 15

const BASE_NAME = 'virtualized-table'

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

const isVisible = <T>(i: Item<T>) => (i.visible ? true : false)
const isChecked = <T>(i: Item<T>) => (i.checked ? true : false)
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
  toggleCheck: (val?) => (i.checked = val !== undefined ? val : !i.checked),
  equal: (_i: Item<T>) => !Object.keys(_i).find(k => i[k] !== _i[k])
})

export const givenColumns = <T>(_columns?: Column<T>[]) => {
  let columns = _columns || []
  return {
    add: (cols: Column<T>[]) => givenColumns(columns.concat(cols)),
    addColumnFor: (key, sortable?) => givenColumns(columns).add([buildColumn(key, sortable)]),
    getDefaultSorting: () => getDefaultSorting(columns),
    sortables: (sorting?: Sort) => columns.filter(c => isSortable(c, sorting)),
    result: columns
  }
}

export const buildColumn = <T>(key?, sortable?) =>
  ({
    name: key || '',
    render: a => a,
    fn: !sortable ? null : (a, b) => textComparison(a, b, o => o)
  } as Column<T>)

export const givenColumn = <T>(_c: Column<T>) => {
  let c = _c || buildColumn()
  return {
    withName: (name: string) => {
      c.name = name
      givenColumn(c)
    },
    withRender: render => {
      c.render = render
      givenColumn(c)
    },
    withSortFn: fn => {
      c.fn = fn
      givenColumn(c)
    },
    isSortable: (sorting?: Sort) => isSortable(c, sorting),
    sort: (sorting: Sort) => sortColumn(c, sorting),
    getSort: (sorting?: Sort) => sorting && sorting[c.name],
    name: () => c.name,
    getStyle: () => getColumnStyle(c),
    result: c
  }
}

export const table = <T>(t: VTable<T>) => {
  const p = t.props
  const s = t.state
  return {
    getHeadScrollElement: () => (p.scrollElement ? p.scrollElement : window),
    getScrollElement: () => (p.scrollElement ? p.scrollElement : p.height ? s.container : window),
    getHeight: () =>
      p.scrollElement
        ? 0
        : (p.height || 0) -
          ((table(t).shouldRenderHeadOutiseOfContainer() && table(t).getRowHeight()) || 0),
    getRowHeight: () => p.rowHeight || CP.list.row_height,
    getDefaultSorting: () =>
      (s && s.sorting) || p.defaultSorting || Given.columns(p.columns).getDefaultSorting(),
    getSortedItems: (sorting?) =>
      Given.items(p.items).sort(sorting || table(t).getDefaultSorting(), p.columns).result,
    setContainer: c => s && t && !s.container && t.setState({ container: c }),
    shouldRenderHead: () => !p.noHead,
    shouldRenderHeadOutiseOfContainer: () =>
      table(t).shouldRenderHead() && p.height && p.stickyHead,
    shouldRenderHeadInsideOfContainer: () =>
      table(t).shouldRenderHead() && !table(t).shouldRenderHeadOutiseOfContainer()
  }
}

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
    ...SF.classNames,
    ...I.classNames,
    ...C.classNames,
    wrapper: `${BASE_NAME}-wrapper`,
    main: BASE_NAME,
    container: `${BASE_NAME}-container`,
    head: 'list-head',
    headColumn: 'list-head-column',
    sortable: sortable => (sortable ? 'sortable' : ''),
    isActionCol: isActionCol => (isActionCol ? 'action-col' : ''),
    rowIndex: (index: number) => `list-item-index-${index}`,
    row: 'list-item',
    rowColumn: 'list-item-column',
    fixed: 'fixed'
  },
  defaultContainerStyle: (height?: number) => ({
    height: height || 'auto'
  })
}

export default CP
