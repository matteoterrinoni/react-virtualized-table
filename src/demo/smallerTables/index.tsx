import React from 'react'

import * as V from './react-virtualized-table';

import Table from './demo/mainTable'

import './style.scss'

const SmallerTables = (p:{withOffsetTop}) => (
	<div className="container">
		<h2>Fully configurable</h2>
		<hr />
		<div className="row">
			<div className="col-md small-table">
				<div className="wrapper">
					<h4>with sticky head and sticky filter</h4>
					<Table
					withOffsetTop={p.withOffsetTop}
					columns={V.GivenVTable.columns().addColumnFor('name', true).result}
					height={300}
					stickyHead={true}
					stickyFilter={true}/>
				</div>
			</div>
			<div className="col-md small-table">
				<div className="wrapper">
					<h4>with sticky head</h4>
					<Table
					withOffsetTop={p.withOffsetTop}
					columns={V.GivenVTable.columns().addColumnFor('name', true).result}
					height={300}
					stickyHead={true}
					stickyFilter={false}/>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-md small-table">
				<div className="wrapper">
					<h4>with sticky filter</h4>
					<Table
					withOffsetTop={p.withOffsetTop}
					columns={V.GivenVTable.columns().addColumnFor('name', true).result}
					height={300}
					stickyHead={false}
					stickyFilter={true}/>
				</div>
			</div>
			<div className="col-md small-table">
				<div className="wrapper">
					<h4>without sticky</h4>
					<Table
					withOffsetTop={p.withOffsetTop}
					columns={V.GivenVTable.columns().addColumnFor('name', true).result}
					height={300}
					stickyHead={false}
					stickyFilter={false}/>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-md small-table">
				<div className="wrapper">
					<h4>Unselectable</h4>
					<Table
					selectable={false}
					withOffsetTop={p.withOffsetTop}
					columns={V.GivenVTable.columns().addColumnFor('name', true).result}
					height={300}
					stickyHead={false}
					stickyFilter={true}/>
				</div>
			</div>
			<div className="col-md small-table">
				<div className="wrapper">
					<h4>Unfilterable</h4>
					<Table
					hideFilter={true}
					withOffsetTop={p.withOffsetTop}
					columns={V.GivenVTable.columns().addColumnFor('name', true).result}
					height={370}
					stickyHead={true}/>
				</div>
			</div>
		</div>
	</div>
)

export default SmallerTables