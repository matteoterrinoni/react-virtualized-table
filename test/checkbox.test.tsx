
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CM from '../src/checkbox/model'

import _Checkbox, {
  	Props
} from '../src/checkbox'

const setup = (checked=false, disabled=false, children?) => {

  const props:Props = {
    checked,
    onChange: (e)=>e,
    disabled,
    children
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const Checkbox = mount(<_Checkbox {...props} />)

  return {
    props,
    Checkbox
  }
}

describe('Checkbox', () => {

  const defaultValue = 'defaultValue'
  const { Checkbox, props } = setup(true, true)

  it('should render self', () => {
    expect(Checkbox.html().indexOf(CM.classNames.checkbox)>-1).toEqual(true)
  })

  it('should be rendered as disabled if disabled is passed', () => {
    expect(Checkbox.html().indexOf(CM.classNames.checkboxDisabled)>-1).toEqual(true)
  })

  it('should be rendered as checked if checked is passed', () => {
    expect(Checkbox.html().indexOf(CM.classNames.checkboxChecked)>-1).toEqual(true)
  })

   const NewCheckbox = setup(false, false).Checkbox

   it('should not be rendered as disabled if disabled is not passed', () => {
   	expect(NewCheckbox.html().indexOf(CM.classNames.checkboxDisabled)>-1).toEqual(false)
   })

})