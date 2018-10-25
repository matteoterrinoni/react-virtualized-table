import * as React from 'react'
import Enzyme from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import F, {
    filtered
} from '../../src/filtered/model'

import {
    aTable
} from '../utils/filtered' 
import { filter } from 'minimatch';

describe('Filtered Given', ()=>{
    
    let Table
    let elem
    beforeEach(()=>{
        Table = aTable()
        elem=document.createElement("div")
    })

    it('should get the right elem height and width', ()=>{
        expect(filtered(Table.get()).getElemHeight(elem)).toBe(elem.offsetHeight)
        expect(filtered(Table.get()).getElemWidth(elem)).toBe(elem.offsetWidth)
    })

})

describe('calculate the right child table offset', ()=>{

    it('when the filter is hided pass sticky offset as childtable offset', ()=>{
        const Table = aTable().hideFilter().get()

        expect(filtered(Table as any).getChildTableOffsetTop()).toBe(0)
    })

    it('when the filter is hided pass sticky offset as childtable offset', ()=>{
        const Table = aTable()

        expect(filtered(Table.hideFilter().get() as any).getChildTableOffsetTop()).toBe(0)
        expect(filtered(Table.hideFilter().addProps({stickyOffset:0}).get() as any).getChildTableOffsetTop()).toBe(0)
        expect(filtered(Table.get() as any).getChildTableOffsetTop()).toBe(0)
        expect(filtered(Table.addProps({stickyOffset:10}).get() as any).getChildTableOffsetTop()).toBe(10)
    })
})

describe('Filtered Given', ()=>{

    it('should pass the right classname when scroll', ()=>{
        expect(F.classNames.windowScroll(100)).not.toContain('window')
        expect(F.classNames.windowScroll(0)).toContain('window')
    })

})