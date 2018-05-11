import * as React from 'react'

import * as V from '../react-virtualized-table';

import {
	FakeItem,
	initFakeItems,
	textComparison
} from './model'


const fakeItems = initFakeItems()
	
export type Props = {

}

export type State = {
	selected: FakeItem[]
}

class MainTable extends React.Component<Props, State>{

	constructor(p){
		super(p)

		this.state = {
			selected: []
		}

		this.setSelected = this.setSelected.bind(this)
	}

	setSelected(selected){
		this.setState({
			selected
		})
	}

	render(){

		const s = this.state

		const columns: V.VTableColumn<FakeItem>[] = [
			{
				name: 'name',
				render: (v) => <strong>{v}</strong>,
				fn: (a, b)=>textComparison(a, b, (o)=>o),
			},
			{
				name: 'age',
				render: (v) => <span>{v}</span>
			},
			{
				name: 'email',
				render: (v) => <span>{v}</span>,
				fn: (a, b)=>textComparison(a, b, (o)=>o),
			}
		]

		return (

			<div className="demo">
				<V.FilteredVTable
					selectable={true}
					items={fakeItems}
					columns={columns}
					defaultSorting={{email:'asc'}}
					onChangeSelection={this.setSelected}
					>
					
					<button
					onClick={()=>alert(JSON.stringify(s.selected))}
					disabled={s.selected.length==0?true:false}
					className="btn btn-primary btn-xs">
						Launch action over {s.selected.length} items
					</button>
				
				</V.FilteredVTable>
			</div>
		)
	}
}

export default MainTable