import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = props => (
	<ContentLoader
		className='pizza-block'
		speed={3}
		width={260}
		height={480}
		viewBox='0 0 260 480'
		backgroundColor='#ececf3'
		foregroundColor='#cdced6'
		{...props}
	>
		<circle cx='120' cy='120' r='120' />
		<rect x='0' y='302' rx='10' ry='10' width='260' height='71' />
		<rect x='3' y='397' rx='10' ry='10' width='78' height='36' />
		<rect x='0' y='264' rx='10' ry='10' width='260' height='21' />
		<rect x='101' y='395' rx='20' ry='20' width='151' height='37' />
	</ContentLoader>
)

export default Skeleton
