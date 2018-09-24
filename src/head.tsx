import React from 'react'

import Sticky from './stickyWrapper'

import CP, {
	Item,
	Column,
	Given,
	Sort,
	sortTypes
} from './model'

export type Props<T> = {
	height?,
	columns:Column<T>[]
	sorting:Sort,
	onSortColumn,
	stickyHead?,
	stickyHeadOffset?
	scrollElement?
	bottomContainer?
}

export type RenderItemProps<T> = {
	item: Item<T>,
	columns: Column<T>[]
}

const Head: <T>(N:Props<T>)=>any = (p) => {

	const renderObj = {
		columns:p.columns
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
								<i className="material-icons">{sortTypes[sort].icon}</i>
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