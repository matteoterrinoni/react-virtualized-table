import * as React from 'react'

import Sticky from './stickyWrapper'

import CP, {
	Item,
	Column,
	Given,
	Sort,
	sortTypes,
	CustomComponents
} from './model'
import Icon from './icon';
import { CustomComponentsContext } from './';

export type Props<T> = {
	height?,
	columns:Column<T>[]
	sorting:Sort,
	onSortColumn,
	stickyHead?,
	stickyHeadOffset?
	scrollElement?
	bottomContainer?
	ref?
}

export type RenderItemProps<T> = {
	item: Item<T>,
	columns: Column<T>[]
}

const Head: <T>(N:Props<T>)=>any = (p) => {

	const renderObj = {
		columns:p.columns
	}

	const getSortIcon = (sort, cc:CustomComponents) => {
		if(sort == sortTypes.asc.key && cc.IconSortAsc){
			return (cc.IconSortAsc as any)()
		}
		
		if(sort == sortTypes.desc.key && cc.IconSortDesc){
			return (cc.IconSortDesc as any)()
		}

		return <Icon name={sortTypes[sort].icon}/>

	}

	return (
		<Sticky
			disabled={!p.stickyHead}
			offset={p.stickyHeadOffset}
			scrollElement={p.scrollElement}
			bottomContainer={p.bottomContainer}>
			
			<div className={CP.classNames.head} style={{
				height:p.height || CP.list.row_height
			}}>
			{
				p.columns.map((c, ci)=>{
					const Gc = Given.column(c);
					const sortable=Gc.isSortable()
					const sort = Gc.getSort(p.sorting)
					return (
						<div
							key={'head-'+ci}
							style={Gc.getStyle()}
							onClick={()=>sortable?p.onSortColumn(c):null}
							className={`${CP.classNames.headColumn} ${CP.classNames.sortable(Gc.isSortable())} ${CP.classNames.isActionCol(c.isActionsCol)} ${c.className?c.className:''}`}>
							{c.title || c.name} 
							{
								sort && 					
								<CustomComponentsContext.Consumer>
								{
									(cc:CustomComponents)=>getSortIcon(sort, cc)
								}
								</CustomComponentsContext.Consumer>
							}
						</div>
					)
				})	
			}
			</div>
		</Sticky>
	)
}

export default Head