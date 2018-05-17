import * as React from "react"

import "./style.scss"

export type Props = {
	onChange?:any,
	checked?:boolean,
	children?:any,
	className?:string
	disabled?:boolean
}

import C from './model'

import Icon from 'src/icon'

export default (p:Props) => {

	const {onChange, children, checked, className, disabled} = p;

	return (
		<div className={`field form-group checkbox-wrapper ${className ? className : ''}`}>
			<div
				className={`custom-checkbox ${checked ? C.classNames.checkboxChecked : ''} ${disabled ? C.classNames.checkboxDisabled : ''}`}
				onClick={()=>onChange(!checked)}>

				<Icon name="check_box_outline_blank" />
				<Icon name="check_box" />
				
				<span className="children">{children}</span>
			
			</div>
		</div>
	)
}