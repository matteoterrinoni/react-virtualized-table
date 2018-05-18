
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import F from '../src/filtered/model'

import {
	FakeItem,
	initFakeItems,
	fakeItemColumns
} from './utils'

import _Filtered, {
  	Props
} from '../src/filtered'

const setup = (filter='test', hideFilter=false, children=null) => {

  const props:Props<FakeItem> = {
  	hideFilter,
  	filter,
    items: initFakeItems(10),
    columns: fakeItemColumns,
    children
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const Filtered = mount(<_Filtered {...props} />)

  return {
    props,
    Filtered
  }
}

describe('Checkbox', () => {

  const { Filtered, props } = setup('testFilter', false, true)

  it('should render self', () => {
    expect(Filtered.html().indexOf(F.classNames.filtered)>-1).toEqual(true)
  })

  it('should render a head wrapper if head is visible', () => {
    expect(Filtered.html().indexOf(F.classNames.filteredHead)>-1).toEqual(true)
  })

  it('should render a filterBox', () => {
  	expect(Filtered.html().indexOf(F.classNames.filterBox)>-1).toEqual(true)
  })

  it('should render other filters if children are provided', () => {
    expect(Filtered.html().indexOf(F.classNames.otherFilters)>-1).toEqual(true)
  })

  it('should render a filter text if provided', () => {
    expect(Filtered.html().indexOf(props.filter)>-1).toEqual(true)
  })

  const FilteredWithoutHead = setup('test', true).Filtered

  it('should not render a head wrapper if head is not visible', () => {
    expect(FilteredWithoutHead.html().indexOf(F.classNames.filteredHead)>-1).toEqual(false)
  })

  it('should not render a filterBox if head is not visible', () => {
  	expect(FilteredWithoutHead.html().indexOf(F.classNames.filterBox)>-1).toEqual(false)
  })

})