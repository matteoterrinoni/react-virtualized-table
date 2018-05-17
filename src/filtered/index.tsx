import * as React from 'react'

import * as Helpers from '../helpers'
const {merge, deepCopy} = Helpers

import VTable, {
	Props as VProps
} from "../index"

import {
	Column
} from 'src/model'

import SearchField from 'src/searchfield'

import Checkbox from 'src/checkbox'

import './style.scss'

import CP, {
	Item,
	Given,
	initCounter,
	Counter
} from 'src/model';

export type Props<T> = VProps<T> & {
	matcher?:Function,
	children?:any,
	filter?:string
	onChangeFilter?,
	hideFilter?
	selectable?
	onChangeSelection?
}

export type State<T> = {
	filter,
	filteredList,
	counter:Counter
}

let items

export default class FilteredVirtualizedTable<T> extends React.Component<Props<T>, State<T>>{
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
			counter
		}

		this.setFilteredList = this.setFilteredList.bind(this)
		this.filterTheList = this.filterTheList.bind(this)
		this.setFilter = this.setFilter.bind(this)
		this.toggleSelection = this.toggleSelection.bind(this)
		this.toggleSelectionAll = this.toggleSelectionAll.bind(this)
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

	setFilter(_filter:string, props:Props<T>){
		const _props = props || this.props
		let filter = _filter.toLowerCase()
		const items = this.getElem(_props.items)
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
				onChange={ (e) => this.toggleSelectionAll(checkedAll)}/>,

				<span className="badge badge-secondary">{this.state.counter.checked}</span>
			],
			width: 60,
			className:"selection-col",
			render: (value,data,cellProps) => (
				<Checkbox
				onChange={ (e) => this.toggleSelection(data) }
				checked={ data.checked }/>
				)	
		} as Column<T>
	}

	render(){
		const {filteredList, counter} = this.state;
		const {items, ...p} = this.props
		const {matcher, children, columns, selectable, ...vTableProps} = p

		const _columns = selectable ?
		[
			this.selectColumn(),
			...columns
		] : columns

		const filter = this.props.filter || this.state.filter

		return (
			<div className={`filtered-virtualized-table ${!vTableProps.height?'window-scroll':''}`}>
				{
					p.hideFilter &&
					<div className="head">
						<div className="filter-box">
							<SearchField
							value={filter}
							onChange={this.setFilter}/>
							{
								<span className="badge badge-secondary counter">{counter.visible}</span>
							}
						</div>
						{
							children &&
							<div className="other-filters">
								{children}
							</div>
						}
					</div>
				}
				<VTable {...vTableProps} columns={_columns} items={filteredList} />
			</div>
		)
	}
}