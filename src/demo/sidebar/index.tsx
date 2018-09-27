import * as React from 'react'

import Table from 'src/demo/mainTable'

import * as V from 'src/react-virtualized-table';

import Icon from 'src/icon'

import {
	sidebar
} from './model'

export type Props = {
	open:boolean,
	onCloseSidebar
}

import './style.scss'

export type State = {
	container
}

class Sidebar extends React.Component<Props, State>{

	container
	constructor(p){
		super(p)

		this.state = {
			container: null
		}
	}

	render(){
		const p = this.props
		const s = this.state
		return(
			<div ref={e=>!this.container && sidebar(this).setContainer(e)}
				className={`side-container ${p.open?'opened':'closed'}`}>

				{
					sidebar(this).showTable() &&
					<Table
					columns={V.GivenVTable.columns().addColumnFor('name', true).addColumnFor('email', true).result}
					stickyHead={true}
					stickyFilter={true}
					scrollElement={s.container}>
						<div
						onClick={p.onCloseSidebar}
						className="toggle-sidebar btn btn-xs btn-primary">
							<Icon name="arrow_back"/>
						</div>
					</Table>
				}
			</div>
		)
	}	
}

export default Sidebar