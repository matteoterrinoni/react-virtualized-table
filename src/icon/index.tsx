import * as React from 'react'

export type Props = {
	type?:string,
	name:string
}

const Icon = (p:Props) => {
	return <i className={`material-icons ${p.type || ''}`}>{p.name}</i>
}

export default Icon