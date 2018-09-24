import React from 'react'

import M from './model'

import SearchField from '../searchfield'

import Sticky from '../stickyWrapper'

import {
	Counter
} from '../model'

export type Props = {
	counter:Counter
	onChangeFilter,
	filter:string,
	children?,
	scrollElement?
	stickyFilter?
	stickyFilterOffset?
	bottomContainer?
}

export type State = {
	fixed:boolean,
	fixedWidth,
	fixedHeight
}

class Head extends React.Component<Props, State>{

	constructor(p){
		super(p)
	}

	render(){
		
		const p = this.props
		const s = this.state

		return (
			<Sticky
				offset={p.stickyFilterOffset}
				bottomContainer={p.bottomContainer}
				disabled={!p.stickyFilter}
				scrollElement={p.scrollElement}>
				
				<div className={M.classNames.filteredHead}>

					<div className={M.classNames.filterBox}>
						<SearchField
						value={p.filter}
						onChange={p.onChangeFilter}/>
						
						{
							<span className="badge badge-secondary counter">{p.counter.visible}</span>
						}

					</div>

					{
						p.children &&
						<div className={M.classNames.otherFilters}>
							{p.children}
						</div>
					}

				</div>
			</Sticky>
		)
	}
}

export default Head