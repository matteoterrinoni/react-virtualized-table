
import * as React from 'react'
import Enzyme from 'enzyme'
import { mount,  } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

import CP from '../src/model'

import _Icon, {
  	Props
} from '../src/icon'

const setup = (name?, type?) => {

  const props:Props = {
    name: name || 'error',
    type: type || null,
  }
  
  Enzyme.configure({ adapter: new Adapter() })
  
  const Icon = mount(<_Icon {...props} />)

  return {
    props,
    Icon
  }
}

describe('Icon', () => {
  it('should render self', () => {
    const { Icon } = setup()
    
    expect(Icon.html().indexOf(CP.classNames.icon)>-1).toEqual(true)

  })

  it('should render the right icon', () => {
  	const icon = 'error'
    const { Icon, props } = setup(icon)
    expect(Icon.html().indexOf(icon)>-1).toEqual(true)
  })

  it('should render the right type', () => {
  	const icon = 'error'
  	const type = 'type'
    const { Icon, props } = setup(icon, type)
    expect(Icon.html().indexOf(type)>-1).toEqual(true)
  })

  it('should render the right name', () => {
    const name = 'test'
  	const Comp = mount(<_Icon name={name}/>)
    expect(Comp.html().indexOf(name)>-1).toEqual(true)
  })

})