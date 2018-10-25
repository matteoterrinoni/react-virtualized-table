
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import CP from '../src/model'

import SearchField, {
  	Props
} from '../src/searchfield'

describe('Searchfield', () => {
  
  let props:Props
  let onChange = jest.fn()

  beforeEach(() => {
    props = {
      value: 'defaultValue',
      onChange,
    };
  });

  it('should render self', () => {
    const Comp = mount(<SearchField {...props} />)
    expect(Comp.html().indexOf(CP.classNames.searchField)>-1).toEqual(true)
  })

  it('should render the right value', () => {
    const Comp = mount(<SearchField {...props} />)
    expect(Comp.html().indexOf('defaultValue')>-1).toEqual(true)
  })

  it('should call onChange one time after typing', () => {
    const text = 'a'
    const Comp = mount(<SearchField {...props} />)
    Comp.find('input').simulate('change', { target: { value: text } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(text);
  })

})