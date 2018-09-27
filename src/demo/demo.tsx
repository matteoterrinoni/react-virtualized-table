import * as React from 'react'

import * as V from 'src/react-virtualized-table';

import {
	FakeItem,
	initFakeItems,
	textComparison,
	demo
} from './model'

import 'MaterialIcons'
import 'Bootstrap'

import Table from './mainTable'

import './style.scss'

import Jumbotron from './jumbotron'

import Sidebar from './sidebar'

import Navbar from './navbar'

import SmallerTables from './smallerTables'

export type Props = {

}

export type State = {
	openSidebar,
	navbar
}

class Demo extends React.Component<Props, State> {

	constructor(p){
		super(p)

		this.state = {
			openSidebar : false,
			navbar : true
		}
	}
	
	render(){
		const s = this.state

		const withOffsetTop = s.navbar?true:false

		return (

			<div className="demo">

				<Navbar
				open={s.navbar}
				onOpenSidebar={()=>demo(this).toggleSidebar(true)}
				onToggleNavbar={()=>demo(this).toggleNavbar()}/>
				
				<Jumbotron />

				{
					true &&
					<Sidebar
					open={s.openSidebar}
					onCloseSidebar={()=>demo(this).toggleSidebar(false)}/>
				}

				{
					true &&
					<SmallerTables withOffsetTop={withOffsetTop} />
				}

				{
					true &&
					<div className="container">
						<Table amount={30} withOffsetTop={withOffsetTop} stickyHead={true} stickyFilter={true}/>
					</div>
				}
				<br/>
				<br/>
				<hr/>
				<br/>
				<br/>
				{
					true &&
					<div className="container">
						<Table amount={30} withOffsetTop={withOffsetTop} stickyHead={true}/>
					</div>
				}
				<br/>
				<br/>
				<hr/>
				<br/>
				<br/>
				{
					true &&
					<div className="container">
						<Table amount={30} withOffsetTop={withOffsetTop}/>
					</div>
				}
				<br/>
				<br/>
				<hr/>
				<br/>
				<br/>

			</div>
		)
	}
}

export default Demo

