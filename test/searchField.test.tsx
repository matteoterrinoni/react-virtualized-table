
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CP from '../src/model'

import _SearchField, {
  	Props
} from '../src/searchfield'

const setup = (value?, onChange?) => {

  const props:Props = {
    value: value || 'defaultValue',
    onChange: onChange ? onChange : (e)=>e,
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const SearchField = mount(<_SearchField {...props} />)

  return {
    props,
    SearchField
  }
}

describe('Icon', () => {

  const defaultValue = 'defaultValue'
  const { SearchField } = setup(defaultValue)

  it('should render self', () => {
    expect(SearchField.html().indexOf(CP.classNames.searchField)>-1).toEqual(true)
  })

  it('should render the right value', () => {
    expect(SearchField.html().indexOf(defaultValue)>-1).toEqual(true)
  })

})