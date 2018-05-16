
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CP, { initCounter, Item, Given, Sort, sortTypes, Column } from '../src/model'

import { FakeItem, initFakeItems, fakeItem, fakeItemColumns, sortableFakeItemColumn, unsortableFakeItemColumn } from './utils'

import VRow, {
  Props
} from '../src/row'

const setup = (item?, columns?) => {

  const props:Props<FakeItem> = {
    item: item || fakeItem().random().result, 
    columns: columns || fakeItemColumns,
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const Row = mount(<VRow {...props} />)

  return {
    props,
    Row
  }
}

describe('Head', () => {
  it('should render self', () => {
    const { Row } = setup()
    
    expect(Row.html().indexOf(CP.classNames.row)>-1).toEqual(true)

  })

  it('should render the right amount of columns', () => {
    const { Row, props } = setup()

    expect(Row.find('.'+CP.classNames.rowColumn).length).toEqual(props.columns.length)
  })

})