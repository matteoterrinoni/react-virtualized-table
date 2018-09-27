import * as React from 'react'

import Icon from 'src/icon'

export type Props = {
	open:boolean,
	onOpenSidebar,
	onToggleNavbar
}

import './style.scss'

const Navbar = (p:Props) => (
	<nav className={`${p.open?'opened':'closed'} navbar sticky-top navbar-expand-lg navbar-dark bg-dark`}>
		
		<div className="container">
			<a onClick={p.onOpenSidebar}
				className="navbar-brand"
				href="#"><Icon name='menu'/></a>
		</div>
		
		<div
			onClick={p.onToggleNavbar}
			className="toggle-navbar">
			<Icon name={p.open?'arrow_upward':'arrow_downward'}/>
		</div>
	</nav>
)

export default Navbar