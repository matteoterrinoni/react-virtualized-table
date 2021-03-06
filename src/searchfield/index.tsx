import * as React from 'react'

export type Props = {
	onChange:Function,
	value
}

import Icon from '../icon'

import CP from './model'


export type SearchFieldComp = ({onChange, value})=>JSX.Element

export default (p:Props) => {
	const {
		onChange,
		value
	} = p
	return (
		<div className={CP.classNames.searchField}>
			<div className="input-group">
				
				<input type="text" className="form-control"
						onChange={(e)=>onChange((e.target as any).value)}
						value={value}
					/>
				
				<div className="input-group-append">
					<span className="input-group-text"><Icon name="search"/></span>
				</div>
			</div>
		</div>
	)	
}