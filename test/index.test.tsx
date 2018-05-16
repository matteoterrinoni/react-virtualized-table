
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
  
  let tableRef
  const Table = mount(<VTable ref={r=>tableRef = r} {...props} />)

  let tableNoHeadRef
  const TableNoHead = mount(<VTable ref={r=>tableNoHeadRef = r} {...propsNoHead} />)

  let tableFixedHeightRef
  const TableFixedHeight = mount(<VTable ref={r=>tableFixedHeightRef = r} {...propsFixed} />)

  return {
    props,
    Table,
    TableNoHead,
    TableFixedHeight,
    propsFixed,
    tableRef,
    tableNoHeadRef,
    tableFixedHeightRef
  }
}

describe('VTable', () => {
  it('should render self', () => {
    const { Table, tableRef } = setup()
    
    expect(Table.html().indexOf(CP.classNames.main)>-1).toEqual(true)

    expect(Table.html().indexOf(CP.classNames.head)>-1).toEqual(true)

  })

  it('should not render the head id noHead is passed', () => {
    const { TableNoHead, tableNoHeadRef } = setup()

    expect(TableNoHead.html().indexOf(CP.classNames.head)).toEqual(-1)
  })

  it('should render with fixed height if height is passed', () => {
    const { TableFixedHeight, propsFixed, tableFixedHeightRef } = setup()

    const container = TableFixedHeight.find(`.${CP.classNames.container}`).html()
    expect(container.indexOf(`height: ${propsFixed.height}px`)>-1).toEqual(true)

  })

})