import * as React from 'react'

import M from './model'

import SearchField from '../searchfield'

import Sticky from '../stickyWrapper'

import {
	Counter, CustomComponents
} from '../model'
import Count from 'src/count';
import { CustomComponentsContext } from '../';

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

					<CustomComponentsContext.Consumer>{
						(cc:CustomComponents)=>
						<div className={M.classNames.filterBox}>
							
							{
								cc.SearchField ?
								<cc.SearchField
								value={p.filter}
								onChange={p.onChangeFilter}/>
								:
								<SearchField
								value={p.filter}
								onChange={p.onChangeFilter}/>
							}
							
							{
								cc.Counter ?
								<cc.Counter count={p.counter.visible}/>
								:
								<Count count={p.counter.visible}/>
							}
							
						
						</div>
					}
					</CustomComponentsContext.Consumer>

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