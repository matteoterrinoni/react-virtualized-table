
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CM from '../src/checkbox/model'

import _Checkbox, {
  Props
} from '../src/checkbox'

const setup = (checked=false, disabled=false, children?, onChange?) => {
  
  const props:Props = {
    checked,
    onChange: onChange ? onChange : (e)=>e,
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
  
  it('should call onChange 1 time when clicked', () => {
    const onChange = jest.fn()
    const Comp = mount(<_Checkbox checked={true} onChange={onChange} />);
    Comp.find('.custom-checkbox').simulate('click')
    expect(onChange).toHaveBeenCalledTimes(1);
  })
  
  it('should call onChnage with the opposite value when clicked', () => {
    const onChange = jest.fn()
    
    const CompTrue = mount(<_Checkbox checked={true} onChange={onChange} />);
    CompTrue.find(`.${CM.classNames.checkbox}`).simulate('click')
    expect(onChange).toHaveBeenCalledWith(false);

    const CompFalse = mount(<_Checkbox checked={false} onChange={onChange} />);
    CompFalse.find(`.${CM.classNames.checkbox}`).simulate('click')
    expect(onChange).toHaveBeenCalledWith(true);

  })

  it('should render classnames when passed', ()=>{
    const classname = 'test'
    const onChange = jest.fn()
    const Comp = mount(<_Checkbox checked={true} onChange={onChange} className={classname} />);
    expect(Comp.find(`.${classname}`)).not.toBeNull()
  })

})