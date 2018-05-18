import * as React from 'react'

import {
	merge, deepCopy
} from 'src/helpers'

import {
	ReactVirtualized,
	AutoSizer,
	List,
	WindowScroller
} from "react-virtualized"

import CP, {
	Item,
	Given,
	Column,
	Sort,
	sortTypes
} from './model';

import RowElement from 'src/row'

import Head from 'src/head'

import './style.scss'

export type Props<T> = {
	items:Item<T>[]
	rowRenderer?
	height?:number
	rowHeight?:number,
	columns:Column<T>[],
	noHead?:boolean,
	defaultSorting?: Sort
}

export type State<T> = {
	loading:boolean,
	sortedItems:Item<T>[]
	sorting: Sort
}

export class VTable<T> extends React.Component<Props<T>, State<T>>{
	
	constructor(p:Props<T>){
		super(p)

		let sorting = p.defaultSorting || Given.columns(p.columns).getDefaultSorting()
		
		this.state = {
			loading: false,
			sortedItems:Given.items(p.items).sort(sorting, p.columns).result,
			sorting
		}

		this.rowRenderer = this.rowRenderer.bind(this);
		this.sortColumn = this.sortColumn.bind(this);
	}

	componentWillReceiveProps(n:Props<T>){
		this.load(n)
	}

	load(p:Props<T>, _sorting?){
		let sorting = _sorting || this.state.sorting || Given.columns(p.columns).getDefaultSorting();
		this.setState(merge(this.state, {
			sortedItems:Given.items(p.items).sort(sorting, p.columns).result,
			sorting
		}), ()=>this.updateList())
	}

	updateList(){
		this._list && this._list.recomputeRowHeights() && this._list.forceUpdate() && this._list.forceUpdateGrid();
	}

	sortColumn(c:Column<T>){
		const {sorting} = this.state
		Given.column(c).sort(sorting)
		this.load(this.props, sorting)
	}

	rowRenderer (a, visibles){
		const {rowRenderer, rowHeight, columns, noHead, items} = this.props
		const {sortedItems} = this.state
		const item = visibles[a.index];

		return (
			<div className={CP.classNames.rowIndex(a.index)} style={a.style} key={a.key}>
				<RowElement
				columns={columns}
				height={rowHeight}
				onRender={rowRenderer}
				item={item}/>
			</div>
		)
	}

	_windowScroller
	_container
	_setRef = windowScroller => {
		this._windowScroller = windowScroller;
	};

	_list
	_setListRef = list => {
		this._list = list;
	};

	length(visibles){
		const p = this.props
		const length =  visibles.length || 0
		return length
	}

	render(){
		const {loading, sorting, sortedItems} = this.state;
		const p = this.props

		const rowHeight = p.rowHeight || CP.list.row_height
		const visibles = Given.items(sortedItems).visibles()

		return loading ? <span>loading...</span> :
		(
			<div
				style={CP.defaultContainerStyle(p.height)}
				className={CP.classNames.container}
				ref={(e)=>this._container = e}>
				
				{
					!p.noHead &&
					<Head 
					columns={p.columns}
					sorting={sorting}
					onSortColumn={this.sortColumn}
					height={rowHeight}/>
				}

				<WindowScroller
				ref={this._setRef}
				scrollElement={p.height ? this._container : window}>
				{({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
					<div className={CP.classNames.wrapper}>
					<div className={CP.classNames.main}>
					<List
					autoHeight
					isScrolling={isScrolling}
					onScroll={onChildScroll}
					scrollTop={scrollTop}
					ref={this._setListRef}
					recomputeRowHeights={false}
					forceUpdate={false}
					height={height}
					overscanRowCount={20}
					rowHeight={rowHeight}
					rowRenderer={a=>this.rowRenderer(a, visibles)}
					rowCount={this.length(visibles)}
					width={CP.list.width}
					/>
					</div>
					</div>
					)}
				</WindowScroller>
        	</div>
        )
	}
}

export default VTable

export { 
	Item as VTableItem,
	Given as GivenVTable,
	Column as VTableColumn,
} from 'src/model'

export { 
	default as FilteredVTable
} from 'src/filtered/index'

export {
	RenderItemProps as VTableRenderItemProps
} from 'src/row'
