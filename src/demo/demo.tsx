import * as React from 'react'

import * as V from '../react-virtualized-table';

import {
	FakeItem,
	initFakeItems,
	textComparison
} from './model'

import 'MaterialIcons'
import 'Bootstrap'

import Table from './mainTable'

const Demo = () => {

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
			render: (v) => <span>{v}</span>
		}
	]

	return (

		<div className="demo">
			
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<h1 className="display-4">React Virtualized Table</h1>
					<p className="lead">A simple virtualized table component to replace react-datagrid</p>
					<hr className="my-4" />
					<p>A useful bridge between react-datagrid (R.I.P.) and react-virtualized</p>
					<p className="lead">
						<a className="btn btn-primary btn-lg" href="#" role="button">GitHub</a>
					</p>
				</div>
			</div>

			<div className="container">

				<Table />
			</div>
		</div>
	)
}

export default Demo

