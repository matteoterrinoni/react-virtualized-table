import M from 'src/model'

export default {
  classNames: {
    filtered: `filtered-${M.classNames.main}`,
    windowScroll: (height?) => `${!height ? 'window-scroll' : ''}`,
    filteredHead: 'filtered-head',
    filterBox: 'filter-box',
    otherFilters: 'other-filters',
    selectionCol: 'selection-col'
  }
}
