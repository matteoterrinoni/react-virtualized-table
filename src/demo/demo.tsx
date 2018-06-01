import * as React from 'react'

import * as V from '../react-virtualized-table';

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
					<div className="container">
						<div className="row">
							<div className="col-md">
								stickyHead and stickyFilter
								<Table
								withOffsetTop={withOffsetTop}
								columns={V.GivenVTable.columns().addColumnFor('name', true).result}
								height={300}
								stickyHead={true}
								stickyFilter={true}/>
							</div>
							<div className="col-md">
								stickyHead
								<Table
								withOffsetTop={withOffsetTop}
								columns={V.GivenVTable.columns().addColumnFor('name', true).result}
								height={300}
								stickyHead={true}
								stickyFilter={false}/>
							</div>
							<div className="col-md">
								stickyFilter
								<Table
								withOffsetTop={withOffsetTop}
								columns={V.GivenVTable.columns().addColumnFor('name', true).result}
								height={300}
								stickyHead={false}
								stickyFilter={true}/>
							</div>
							<div className="col-md">
								no sticky
								<Table
								withOffsetTop={withOffsetTop}
								columns={V.GivenVTable.columns().addColumnFor('name', true).result}
								height={300}
								stickyHead={false}
								stickyFilter={false}/>
							</div>
						</div>
					</div>
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

