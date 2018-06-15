import React from 'react'

export type Props = {
	type?:string,
	name:string
}

import CP from 'src/model'

const Icon = (p:Props) => {
	return <i className={`${CP.classNames.icon} ${p.type || ''}`}>{p.name}</i>
}

export default Icon