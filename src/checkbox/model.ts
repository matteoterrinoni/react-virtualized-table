export type Props = {
  onChange?: any
  checked?: boolean
  children?: any
  className?: string
  disabled?: boolean
}

const C = {
  classNames: {
    checkboxWrapper: 'checkbox-wrapper',
    checkbox: 'custom-checkbox',
    checkboxChecked: 'checked',
    checkboxUnchecked: 'unchecked',
    checkboxDisabled: 'disabled'
  }
}

export default C

export const getCheckboxClassName = (p: Props) => {
  return `${C.classNames.checkbox} ${p.checked ? C.classNames.checkboxChecked : ''} ${
    p.disabled ? C.classNames.checkboxDisabled : ''
  }`
}
