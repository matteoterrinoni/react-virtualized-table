import React from 'react'

import * as Helpers from '../helpers'
const {merge, deepCopy} = Helpers

import {
	VTable,
	VTableProps
} from "src"

import {
	Column
} from 'src/model'

import SearchField from 'src/searchfield'

import Checkbox from 'src/checkbox'

import Head from './head'

import './style.scss'

import M, {
	filtered
} from './model'

import CP, {
	Item,
	Given,
	initCounter,
	Counter
} from 'src/model';

export type Props<T> = VTableProps<T> & {
	matcher?:Function,
	children?:any,
	filter?:string
	onChangeFilter?,
	hideFilter?
	selectable?
	onChangeSelection?
	stickyFilter?
}

export type State<T> = {
	filter,
	filteredList,
	counter:Counter,
	headRef
}

let items

export default class FilteredVirtualizedTable<T> extends React.Component<Props<T>, State<T>>{

	container
	constructor(p:Props<T>){
		super(p)

		//to avoid deepCopy and passing the data by value to state
		const list = this.getElem(p.items)
		const counter = initCounter()
		const filter = p.filter ? this.getElem(p.filter) : '';

		this.filterTheList(list, filter, counter)

		this.state = {
			filter,
			filteredList:list,
			counter,
			headRef: null
		}

		this.setFilteredList = this.setFilteredList.bind(this)
		this.filterTheList = this.filterTheList.bind(this)
		this.setFilter = this.setFilter.bind(this)
		this.toggleSelection = this.toggleSelection.bind(this)
		this.toggleSelectionAll = this.toggleSelectionAll.bind(this)
		this.container = React.createRef();
	}

	getElem(elem){
		return deepCopy(elem)
	}

	componentWillReceiveProps(n:Props<T>){
		if(JSON.stringify(n.items) != JSON.stringify(this.props.items)){
			this.load(n)
		}
	}

	setFilteredList(items){
		this.setState(merge(this.state, {
			filteredList: items
		}))
	}

	load(p:Props<T>){
		this.setFilter(this.state.filter, p)
	}

	filterTheList(items, filter?, counter?){
		Given.items(items).filter((filter!=undefined ? filter : this.state.filter), this.props.matcher, counter || initCounter())
	}

	setFilter(_filter:string, props?:Props<T>){
		const _props = props || this.props
		const items = props ? this.getElem(_props.items) : this.state.filteredList
		let filter = _filter.toLowerCase()
		let counter = initCounter()
		this.filterTheList(items, filter, counter)
		this.setState(merge(this.state, {
			filter: _filter,
			filteredList: items,
			counter
		}), ()=>{
			_props.onChangeFilter && _props.onChangeFilter(_filter)
			this.onChangeSelection(items, _props)
		})
	}

	onChangeSelection(items:Item<T>[], p:Props<T>){
		p.onChangeSelection && p.onChangeSelection(Given.items(this.getElem(items)).filterChecked().clean().result)
	}

	toggleSelection(data:Item<T>){
		const p = this.props
		const s = this.state
		let counter = initCounter()
		Given.items(s.filteredList).toggleCheckItem(data)
		this.filterTheList(s.filteredList, this.state.filter, counter)
		this.setState(merge(this.state, {
			filteredList: s.filteredList,
			counter
		}), ()=>{
			this.onChangeSelection(s.filteredList, p)
		})
	}

	toggleSelectionAll(val){
		const p = this.props
		const s = this.state
		let counter = initCounter()
		Given.items(s.filteredList).toggleCheck(val)
		this.filterTheList(s.filteredList, this.state.filter, counter)
		this.setState(merge(this.state, {
			filteredList: s.filteredList,
			counter
		}), ()=>{
			this.onChangeSelection(s.filteredList, p)
		})
	}

	selectColumn(){
		const checkedAll = this.props.items.length > 0 && (this.state.counter.checked == this.props.items.length) ? true : false
		return {
			name: "select",
			title: [
				<Checkbox checked={checkedAll}
				disabled={this.props.items.length == 0}
				onChange={ (e) => this.toggleSelectionAll(!checkedAll)}/>,

				<span className="badge badge-secondary">{this.state.counter.checked}</span>
			],
			width: 60,
			className: M.classNames.selectionCol,
			render: (value,data,cellProps) => (
				<Checkbox
				onChange={ (e) => this.toggleSelection(data) }
				checked={ data.checked }/>
				)	
		} as Column<T>
	}

	render(){
		const s = this.state;
		const p = this.props;
		const {filteredList, counter} = s;
		const {items, ..._p} = p
		const {matcher, children, columns, selectable, stickyFilter, ...vTableProps} = _p

		const _columns = selectable ?
		[
			this.selectColumn(),
			...columns
		] : columns

		const filter = this.props.filter || this.state.filter

		return (
			<div
			ref={this.container}
			className={`${M.classNames.filtered} ${M.classNames.windowScroll(vTableProps.height)}`}>
				{
					!p.hideFilter &&
					<div ref={filtered(this).setHeadRef}>
						<Head
						stickyFilter={stickyFilter}
						stickyFilterOffset={vTableProps.stickyOffset}
						children={children}
						counter={counter}
						filter={filter}
						onChangeFilter={this.setFilter}
						scrollElement={vTableProps.scrollElement}
						bottomContainer={this.container.current}/>
					</div>
				}
				{
					filtered(this).showTable() &&
					<VTable
					{...vTableProps}
					stickyOffset={filtered(this).getChildTableOffsetTop()}
					columns={_columns}
					items={filteredList} />
				}
			</div>
		)
	}
}