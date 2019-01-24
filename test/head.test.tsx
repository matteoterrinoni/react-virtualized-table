
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CP, { initCounter, Item, Given, Sort, sortTypes, Column } from '../src/model'

import { FakeItem, initFakeItems, fakeItem, fakeItemColumns, sortableFakeItemColumn, unsortableFakeItemColumn } from './utils'

import VHead, {
  Props
} from '../src/head'
import { CustomComponentsContext } from '../src';

const setup = (columns?, sorting?) => {

  const props:Props<FakeItem> = {
    columns: columns || fakeItemColumns,
    sorting: sorting || Given.columns(fakeItemColumns).getDefaultSorting(),
    onSortColumn: ()=>null
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const Head = mount(
    <CustomComponentsContext.Provider value={{}}>
      <VHead {...props} />
    </CustomComponentsContext.Provider>
  )

  return {
    props,
    Head
  }
}

describe('Head', () => {
  it('should render self', () => {
    const { Head } = setup()
    
    expect(Head.html().indexOf(CP.classNames.head)>-1).toEqual(true)

  })

  it('should render the right amount of columns', () => {
    const { Head } = setup()

    expect(Head.find('.'+CP.classNames.headColumn).length).toEqual(fakeItemColumns.length)
  })

  it('should render an icon when sortable', () => {
    const { Head } = setup([sortableFakeItemColumn])
    expect(Head.find('.'+CP.classNames.headColumn).find('.'+CP.classNames.icon).length).toEqual(1)

    const HeadUnsortable = setup([unsortableFakeItemColumn]).Head
    expect(HeadUnsortable.find('.'+CP.classNames.headColumn).find('.'+CP.classNames.icon).length).toEqual(0)

  })

  it('should render the right icon when sortable asc or desc', () => {
    const { Head } = setup([sortableFakeItemColumn], {[sortableFakeItemColumn.name]: sortTypes.asc.key})
    expect(Head
      .find('.'+CP.classNames.headColumn)
      .find('.'+CP.classNames.icon)
      .html()
      .indexOf(sortTypes.asc.icon)>-1
    ).toEqual(true)

    const HeadDesc = setup([sortableFakeItemColumn], {[sortableFakeItemColumn.name]: sortTypes.desc.key}).Head
    expect(HeadDesc
      .find('.'+CP.classNames.headColumn)
      .find('.'+CP.classNames.icon)
      .html()
      .indexOf(sortTypes.desc.icon)>-1
    ).toEqual(true)

  })

})