import StickyWrapper, { Props, State } from './index'

export const SM = {
  classNames: {
    stickyWrapper: 'sticky-wrapper',
    fixed: 'fixed',
    fixedPlaceholder: 'fixed-placeholder',
    stickyContent: 'sticky-content'
  }
}

export const fixedStatuses = {
  fixed: 'fixed',
  bottomFixed: 'bottom-fixed'
}

export default SM

const offsetTop = elem => elem.offsetTop + (elem.offsetParent && elem.offsetParent.offsetTop) || 0
const height = elem => elem.offsetHeight
const width = elem => elem.offsetWidth

export const S = (t: StickyWrapper, _p?: Props) => {
  const p = _p || t.props
  const s = t.state
  return {
    getScrollElement: () => p.scrollElement || window,

    addScrollListener: () =>
      S(t)
        .getScrollElement()
        .addEventListener('scroll', t.handleScroll, { passive: true }),

    removeScrollListener: () =>
      S(t)
        .getScrollElement()
        .removeEventListener('scroll', t.handleScroll, { passive: true }),

    getScrollY: () =>
      p.scrollElement ? p.scrollElement.scrollTop || p.scrollElement.scrollY || 0 : window.scrollY,

    getOffset: () => p.offset || 0,

    getElemOffsetTop: elem => offsetTop(elem),

    isElemFixed: () => {
      const scrollY = S(t).getScrollY()
      const topOffset = S(t).getElemOffsetTop(t.wrapper.current) - S(t).getOffset()
      const bottomOffset =
        p.bottomContainer && topOffset + height(p.bottomContainer) - S(t).getElemHeight()
      let fixed = ''
      if (scrollY > topOffset) {
        if (bottomOffset ? scrollY < bottomOffset : true) {
          fixed = fixedStatuses.fixed
        } else {
          fixed = fixedStatuses.bottomFixed
        }
      }
      return fixed
    },

    getStickyWrapperClassName: () =>
      `${SM.classNames.stickyWrapper} ${s && s.fixed ? s.fixed : ''}`,

    getElemWidth: () => width(t.wrapper.current),

    getElemHeight: () => height(t.wrapper.current),

    getTopFixedStyle: () =>
      (p.scrollElement ? offsetTop(p.scrollElement) : 0) + (p.offset ? p.offset : 0) + 'px',

    getTopBottomFixedStyle: () => height(p.bottomContainer) - S(t).getElemHeight() + 'px',

    getContentStyle: () => ({
      width: S(t).isGenericFixed() ? s.fixedWidth + 'px' : '100%',
      top: S(t).isFixed()
        ? S(t).getTopFixedStyle()
        : S(t).isBottomFixed()
          ? S(t).getTopBottomFixedStyle()
          : 0
    }),

    getPlaceholderStyle: () => ({ height: S(t).isGenericFixed() ? s.fixedHeight + 'px' : '0' }),

    isFixed: () => s && s.fixed === fixedStatuses.fixed,

    isBottomFixed: () => s && s.fixed === fixedStatuses.bottomFixed,

    isGenericFixed: () => s && s.fixed && s.fixed.length > 0
  }
}
