import * as React from 'react'

import Icon from 'src/icon'

import './style.scss'

const Jumbotron = () => (
	<div className="jumbotron jumbotron-fluid">
		<div className="container">
			<h1 className="display-4">React Virtualized Table</h1>
			<p className="lead">A simple fully working table using react-virtualized.</p>
			<hr className="my-4" />
			<p>Selectable, filterable, and sortable.</p>
			
			<p className="lead">
				<a className="btn btn-primary" href="https://github.com/matteoterrinoni/react-virtualized-table" role="button">GitHub</a>
			</p>

		</div>
	</div>
)

export default Jumbotron