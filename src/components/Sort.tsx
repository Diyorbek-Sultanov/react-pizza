import React from 'react'
import { useDispatch } from 'react-redux'

import { setSortType, SortEnum, SortT } from '../redux/slices/filterSlice'

type SortListT = {
	name: string
	sortProp: SortEnum
}

type PopupClickT = MouseEvent & {
	path: Node[]
}

type SortPropsT = {
	value: SortT
}

export const sortList: SortListT[] = [
	{ name: 'популярности (DESC', sortProp: SortEnum.RATING_DESC },
	{ name: 'популярности (ASC)', sortProp: SortEnum.RATING_ASC },
	{ name: 'цене (DESC)', sortProp: SortEnum.PRICE_DESC },
	{ name: 'цене (ASC)', sortProp: SortEnum.PRICE_ASC },
	{ name: 'алфавиту (DESC)', sortProp: SortEnum.TITLE_DESC },
	{ name: 'алфавиту(ASC)', sortProp: SortEnum.TITLE_ASC },
]

const Sort: React.FC<SortPropsT> = React.memo(({ value }) => {
	const dispatch = useDispatch()
	// const sort = useSelector((state: RootState) => state.filter.sort)

	const [open, setOpen] = React.useState<boolean>(false)
	const sortRef = React.useRef<HTMLDivElement>(null)

	const onClickList = (item: SortListT) => {
		dispatch(setSortType(item))
		setOpen(false)
	}

	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const _event = event as PopupClickT
			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setOpen(false)
			}
		}

		document.body.addEventListener('click', handleClick)

		return () => document.body.removeEventListener('click', handleClick)
	}, [])

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{value.name}</span>
			</div>
			{open && (
				<div className='sort__popup'>
					<ul>
						{sortList.map((item, i) => (
							<li
								onClick={() => onClickList(item)}
								className={value.sortProp === item.sortProp ? 'active' : ''}
								key={i}
							>
								{item.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
})

export default Sort
