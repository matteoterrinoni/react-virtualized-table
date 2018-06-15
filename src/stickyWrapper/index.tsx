import React from 'react'

import SM, {
	S as Sticky
} from './model'

import './style.scss'

export type Props = {
	disabled?:boolean,
	scrollElement?,
	bottomContainer?
	children,
	offset?:number
}

export type State = {
	fixed:string,
	fixedWidth,
	fixedHeight
}

class StickyWrapper extends React.Component<Props, State>{

	wrapper
	content
	constructor(p){
		super(p)

		this.handleScroll = this.handleScroll.bind(this)
		this.content = React.createRef();
		this.wrapper = React.createRef();

	}

	componentDidMount() {
		const p = this.props
		//if scrollElem is not passed or is passed already instanciated (as not null)
		if(!p.disabled && (p.scrollElement === undefined || p.scrollElement !== null)){
			Sticky(this).addScrollListener()
		}
	}

	componentWillReceiveProps(n:Props) {
		const p = this.props
		if(!p.disabled && !p.scrollElement && (n.scrollElement !== p.scrollElement)){
			Sticky(this, n).addScrollListener()
		}
	}

	componentWillUnmount() {
		const p = this.props
		!p.disabled && Sticky(this).removeScrollListener()
	}

	handleScroll(event) {
		const p = this.props
		!p.disabled && this.setState({
			fixed: Sticky(this).isElemFixed(),
			fixedWidth: Sticky(this).getElemWidth(),
			fixedHeight: Sticky(this).getElemHeight()
		})

	}

	render(){
		
		const p = this.props
		const s = this.state

		return p.disabled ? p.children : (
			<div
				ref={this.wrapper}
				className={Sticky(this).getStickyWrapperClassName()}>
				
				<div
				style={Sticky(this).getPlaceholderStyle()}
				className={SM.classNames.fixedPlaceholder}></div>
				
				<div
				ref={this.content}
				style={Sticky(this).getContentStyle()}
				className={SM.classNames.stickyContent}>
					{p.children}
				</div>
				
			</div>
		)
	}
}

export default StickyWrapper