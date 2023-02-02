import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
	return (
		<>
			<h1 className={styles.root}>Ничего не найдено</h1>
			<Link to='/'>
				<button className='button'>Назадь</button>
			</Link>
		</>
	)
}

export default NotFoundBlock
