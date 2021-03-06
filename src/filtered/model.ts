import FVTable, { Props, State } from './index'

import M from '../model'

const F = {
  classNames: {
    filtered: `filtered-${M.classNames.main}`,
    windowScroll: (height?) => `${!height ? 'window-scroll' : ''}`,
    filteredHead: 'filtered-head',
    filteredHeadWrapper: 'filtered-head-wrapper',
    fixedHeadPlaceholder: 'fixed-head-placeholder',
    filterBox: 'filter-box',
    otherFilters: 'other-filters',
    selectionCol: 'selection-col'
  }
}

export default F

export const filtered = <T>(t: FVTable<T>) => {
  const p = t.props
  const s = t.state
  return {
    getElemWidth: elem => elem.offsetWidth,
    getElemHeight: elem => elem.offsetHeight,
    getStickyOffset: () => p.stickyOffset || 0,
    getChildTableOffsetTop: () => {
      return p.hideFilter || !p.stickyFilter
        ? filtered(t).getStickyOffset()
        : t.state.headRef &&
            filtered(t).getStickyOffset() + filtered(t).getElemHeight(t.state.headRef)
    },
    setHeadRef: e => !t.state.headRef && t.setState({ headRef: e }),
    showTable: () => p.hideFilter || t.state.headRef
  }
}
