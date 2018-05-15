
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CP, { initCounter, Item, Given, Sort, sortTypes, Column } from '../src/model'

import { FakeItem, initFakeItems, fakeItem, fakeItemColumns } from './utils'

import VTable, {
  Props
} from '../src/index'

const setup = () => {

  let items = initFakeItems(10) as Item<FakeItem>[]

  const props:Props<FakeItem> = {
    items,
    columns: fakeItemColumns
  }

  const propsNoHead:Props<FakeItem> = {
    ...props,
    noHead: true
  }

  const propsFixed:Props<FakeItem> = {
    ...props,
    height: 111
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const Table = mount(<VTable {...props} />)

  const TableNoHead = mount(<VTable {...propsNoHead} />)

  const TableFixedHeight = mount(<VTable {...propsFixed} />)

  return {
    props,
    Table,
    TableNoHead,
    TableFixedHeight,
    propsFixed
  }
}

describe('VTable', () => {
  it('should render self', () => {
    const { Table } = setup()
    
    expect(Table.html().indexOf(CP.classNames.main)>-1).toEqual(true)

    expect(Table.html().indexOf(CP.classNames.head)>-1).toEqual(true)

  })

  it('should not render the head id noHead is passed', () => {
    const { TableNoHead } = setup()

    expect(TableNoHead.html().indexOf(CP.classNames.head)).toEqual(-1)
  })

  it('should render with fixed height if height is passed', () => {
    const { TableFixedHeight, propsFixed } = setup()

    const container = TableFixedHeight.find(`.${CP.classNames.container}`).html()
    expect(container.indexOf(`height: ${propsFixed.height}px`)>-1).toEqual(true)
  })

})