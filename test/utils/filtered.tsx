import * as React from 'react'

import {
    FakeItem,
    initFakeItems,
    fakeItemColumns
} from ".";

import Filtered, {
    Props
} from '../../src/filtered'

export const aTable = (_props?) => {

    let props:Props<FakeItem> = _props || {
        items: initFakeItems(10),
        columns: fakeItemColumns,
    }

    return {

        onChangeFilter: (onChange)=> {
            props.onChangeFilter = onChange
            return aTable(props)
        },

        hideFilter: () => {
            props.hideFilter = true
            return aTable(props)
        },
        
        filter: (filter) => {
            props.hideFilter = false
            props.filter = filter
            return aTable(props)
        },
        
        numOfRows: (n) => {
            props.items = initFakeItems(n)
            return aTable(props)
        },

        addProps: (_p)=> {
            props = {
                ...props,
                ..._p
            }
            return aTable(props)
        },

        props: ()=>props,

        get: ()=><Filtered {...props} />
    }
}