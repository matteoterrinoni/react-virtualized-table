import React from 'react'

import CP, {
	Item,
	Column,
	Given,
	getColumnStyle
} from './model'


export type Props<T> = {
	item: Item<T>
	onRender?,
	height?,
	columns:Column<T>[]
}

export type RenderItemProps<T> = {
	item: Item<T>,
	columns: Column<T>[]
}

const Row: <T>(N:Props<T>)=>any = (p) => {

	const renderObj = {
		item:p.item,
		columns:p.columns
	}

	return p.item ? (
		<div className={CP.classNames.row} style={{
			height:p.height || CP.list.row_height
		}}>
		{
			p.onRender ?
			p.onRender(renderObj) : (
				p.columns.map((c, ci)=>{
					return (
						<div
						key={ci}
						onClick={()=>c.onClick?c.onClick(p.item[c.name], p.item):null}
						style={getColumnStyle(c)}
						className={`${CP.classNames.rowColumn} ${CP.classNames.isActionCol(c.isActionsCol)} ${c.className}`}>
							{c.render(p.item[c.name], p.item)}
						</div>
					)
				})
			)
		}
		</div>
	) : null
}

export default Row