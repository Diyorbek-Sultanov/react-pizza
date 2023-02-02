import React from 'react'

type CategoriesPropsT = {
	value: number
	onClickCategory: (i: number) => void
}

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

const Categories: React.FC<CategoriesPropsT> = React.memo(
	({ value, onClickCategory }) => {
		return (
			<div className='categories'>
				<ul>
					{categories.map((catName, i) => (
						<li
							onClick={() => onClickCategory(i)}
							className={value === i ? 'active' : ''}
							key={i}
						>
							{catName}
						</li>
					))}
				</ul>
			</div>
		)
	},
)

export default Categories
