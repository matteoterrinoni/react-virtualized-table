import * as React from "react"

import "./style.scss"

type Props = {
	onChange?:any,
	checked?:boolean,
	children?:any,
	className?:string
	disabled?:boolean
}

export default (p:Props) => {

	const {onChange, children, checked, className, disabled} = p;

	return (
		<div className={`field form-group checkbox-wrapper ${className ? className : ''}`}>
			<div
				className={`custom-checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
				onClick={()=>onChange(!checked)}>

				<i className="material-icons unchecked">check_box_outline_blank</i>
				<i className="material-icons checked">check_box</i>
				
				<span className="children">{children}</span>
			
			</div>
		</div>
	)
}