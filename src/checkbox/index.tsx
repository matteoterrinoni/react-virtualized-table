import React from "react"

import "./style.scss"

import C, {
	Props,
	getCheckboxClassName
} from './model'

export {
	Props
} from './model'

import Icon from 'src/icon'

export default (p:Props) => {

	const {onChange, children, checked, className, disabled} = p;

	return (
		<div className={`field form-group ${C.classNames.checkboxWrapper} ${className ? className : ''}`}>
			<div
				className={getCheckboxClassName(p)}
				onClick={()=>onChange(!checked)}>

				<Icon type={C.classNames.checkboxUnchecked} name="check_box_outline_blank" />
				<Icon type={C.classNames.checkboxChecked} name="check_box" />
				
				<span className="children">{children}</span>
			
			</div>
		</div>
	)
}