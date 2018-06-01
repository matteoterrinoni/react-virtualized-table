import * as React from 'react'

import * as V from 'src/react-virtualized-table';

import {
	FakeItem,
	initFakeItems,
	textComparison
} from 'src/demo/model'

import './style.scss'
	
export type Props = {
	scrollElement?
	stickyFilter?
	stickyHead?
	hideFilter?
	columns?: V.VTableColumn<FakeItem>[],
	height?:number
	withOffsetTop?:boolean
	children?
	amount?:number
}

export type State = {
	selected: FakeItem[],
	fakeItems: FakeItem[]
}

class MainTable extends React.Component<Props, State>{

	constructor(p){
		super(p)

		this.state = {
			selected: [],
			fakeItems: initFakeItems(p.amount)
		}

		this.setSelected = this.setSelected.bind(this)
	}

	setSelected(selected){
		this.setState({
			selected
		})
	}

	render(){
		const p = this.props
		const s = this.state

		const columns: V.VTableColumn<FakeItem>[] = p.columns || V.GivenVTable.columns()
		.addColumnFor('name', true)
		.addColumnFor('age')
		.addColumnFor('email', true)
		.result

		return (

			<div className="demo">
				<V.FilteredVTable
					hideFilter={p.hideFilter}
					stickyOffset={p.withOffsetTop?56:null}
					stickyHead={p.stickyHead}
					stickyFilter={p.stickyFilter}
					scrollElement={p.scrollElement}
					height={p.height}
					selectable={true}
					items={s.fakeItems}
					columns={columns}
					defaultSorting={{email:'asc'}}
					onChangeSelection={this.setSelected}
					>

					<div className="maintable-buttons button-toolbar">

						<button
						onClick={()=>alert(JSON.stringify(s.selected))}
						disabled={s.selected.length==0?true:false}
						className="btn btn-primary btn-xs">
							{s.selected.length}
						</button>

						{p.children}

					</div>
				
				</V.FilteredVTable>
			</div>
		)
	}
}

export default MainTable