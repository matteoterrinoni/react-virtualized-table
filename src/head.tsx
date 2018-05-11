import * as React from 'react'

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
	onSortColumn
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
		<div className={`list-head`} style={{
			height:p.height || CP.list.row_height
		}}>
		{
			p.columns.map((c, ci)=>{
				const Gc = Given.column(c);
				const sortable=Gc.isSortable()
				const sort = Gc.getSort(p.sorting)
				return (
					<div
						key={ci}
						style={Gc.getStyle()}
						onClick={()=>sortable?p.onSortColumn(c):null}
						className={`list-head-column ${Gc.isSortable()?'sortable':''} ${c.isActionsCol?'actions-col':''} ${c.className?c.className:''}`}>
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
	)
}

export default Head