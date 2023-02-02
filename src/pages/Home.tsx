import React from 'react'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { sortList } from '../components/Sort'

import { Categories, Sort, Pizza, Skeleton, Pagination } from '../components'

import {
	setCategoryId,
	setFilterParams,
	setPaginationId,
} from '../redux/slices/filterSlice'
import { fetchPizzas, SearchParamsT } from '../redux/slices/pizzaSlice'
import { RootState, useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)
	const { sort, categoryId, currentPage, searchVal } = useSelector(
		(state: RootState) => state.filter,
	)
	const { pizzas, status } = useSelector((state: RootState) => state.pizza)

	const onClickCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onClickPagination = (id: number) => {
		dispatch(setPaginationId(id))
	}

	const getPizzas = async () => {
		const categoryIdd = categoryId > 0 ? `category=${categoryId}` : ''
		const sortd = sort.sortProp.replace('-', '')
		const order = sort.sortProp.includes('-') ? 'asc' : 'desc'
		const search = searchVal ? `search=${searchVal}` : ''

		dispatch(
			fetchPizzas({
				categoryIdd,
				sortd,
				order,
				search,
				currentPage,
			}),
		)
	}

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProp,
				categoryId: categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProp, currentPage])

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1),
			) as unknown as SearchParamsT
			const sort = sortList.find(obj => obj.sortProp === params.sortd)

			dispatch(
				setFilterParams({
					categoryId: Number(params.categoryIdd),
					sort: sort || sortList[0],
					order: params.order,
					searchVal: params.search,
					currentPage: Number(params.currentPage),
				}),
			)

			isSearch.current = true
		}
	}, [])

	React.useEffect(() => {
		getPizzas()

		window.scrollTo(0, 0)
	}, [categoryId, sort.sortProp, searchVal, currentPage])

	const items = pizzas.map((obj: any) => <Pizza {...obj} key={obj.id} />)
	const skeleton = [...new Array(4)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error'>
					<h2>
						Ну удалось загрузить пиццы <span>😕</span>
					</h2>
					<p>Повторите еще раз!</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeleton : items}
				</div>
			)}

			<Pagination
				currentPage={currentPage}
				onClickPagination={(id: number) => onClickPagination(id)}
			/>
		</div>
	)
}

export default Home
