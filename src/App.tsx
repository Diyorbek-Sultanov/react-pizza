import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'
import Home from './pages/Home'
import './scss/app.scss'

const Cart = React.lazy(
	() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'),
)
const PizzaDetail = React.lazy(
	() => import(/*webpackChunkName: "PizzaDetail"*/ './pages/PizzaDetail'),
)
const NotFound = React.lazy(
	() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'),
)

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<React.Suspense fallback={<div>loading...</div>}>
							<Cart />
						</React.Suspense>
					}
				/>
				<Route
					path='pizza/:id'
					element={
						<React.Suspense fallback={<div>loading...</div>}>
							<PizzaDetail />
						</React.Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<React.Suspense fallback={<div>loading...</div>}>
							<NotFound />
						</React.Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
