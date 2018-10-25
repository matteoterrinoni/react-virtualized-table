import * as React from 'react'

import {
	merge, deepCopy
} from './helpers'

import {
	ReactVirtualized,
	AutoSizer,
	List,
	WindowScroller
} from "react-virtualized"

import CP, {
	Item,
	Given,
	table,
	Column,
	Sort,
	sortTypes
} from './model';

export type VTableProps<T> = {
  items:Item<T>[]
  rowRenderer?
  height?:number
  rowHeight?:number,
  columns:Column<T>[],
  noHead?:boolean,
  defaultSorting?: Sort,
  scrollElement?
  stickyHead?
  stickyOffset?
}

export type VTableState<T> = {
  loading:boolean,
  sortedItems:Item<T>[]
  sorting: Sort,
  container
}

import RowElement from './row'

import Head from './head'

import './style.scss'

export class VTable<T> extends React.PureComponent<VTableProps<T>, VTableState<T>>{
	
	wrapper
	constructor(p:VTableProps<T>){
		super(p)

		let sorting = table(this).getDefaultSorting()
		
		this.state = {
			loading: false,
			sortedItems:table(this).getSortedItems(sorting),
			sorting,
			container:null
		}

		this.rowRenderer = this.rowRenderer.bind(this);
		this.sortColumn = this.sortColumn.bind(this);
		this.wrapper = React.createRef();
	}

	componentWillReceiveProps(n:VTableProps<T>){
		this.load(n)
	}

	load(p:VTableProps<T>, _sorting?){
		let sorting = _sorting || table(this).getDefaultSorting();
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

	head(t:VTable<T>){
		const p = t.props
		const s = t.state

		return <Head
			scrollElement={table(t).getHeadScrollElement()}
			columns={p.columns}
			sorting={s.sorting}
			onSortColumn={t.sortColumn}
			height={table(t).getRowHeight()}
			stickyHead={p.stickyHead}
			stickyHeadOffset={p.stickyOffset}
			bottomContainer={t.wrapper.current}
			/>
	}

	render(){
		const {loading, sorting, sortedItems} = this.state;
		const p = this.props
		const s = this.state

		const rowHeight = table(this).getRowHeight()
		const visibles = Given.items(sortedItems).visibles()
		const scrollElement = table(this).getScrollElement()
		const height = table(this).getHeight()

		return loading ? <span>loading...</span> :
		(
			<div ref={this.wrapper}>
				{
					table(this).shouldRenderHeadOutiseOfContainer() &&
					this.head(this)
				}
				<div
					style={CP.defaultContainerStyle(height)}
					className={CP.classNames.container}
					ref={(e)=>table(this).setContainer(e)}>

					{
						table(this).shouldRenderHeadInsideOfContainer() &&
						this.head(this)
					}

					{
						s.container &&
						<WindowScroller
						ref={this._setRef}
						scrollElement={scrollElement}>
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
					}
					
	        	</div>
        	</div>
        )
	}
}

export default VTable

export { 
	Item as VTableItem,
	Given as GivenVTable,
	Column as VTableColumn,
} from './model'

export {
	RenderItemProps as VTableRenderItemProps
} from './row'
