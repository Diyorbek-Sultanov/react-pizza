import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import Header from '../components/Header'
import { RootState } from '../redux/store'

const Layout: React.FC = () => {
	const { isDark } = useSelector((state: RootState) => state.theme)

	return (
		<div
			className={clsx('layout', {
				'layout-dark': isDark === true,
			})}
		>
			<div className='wrapper'>
				<Header />
				<div className='content'>
					<div className='container'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Layout
