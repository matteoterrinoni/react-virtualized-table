import * as React from 'react'

export type Props = {
	count
}

export type CountComp = (p:Props)=>JSX.Element

const Count = (p:Props) => {
	return <span className="badge badge-secondary counter">{p.count}</span>
}

export default Count