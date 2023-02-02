import React from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux/es/exports'

import { setSearchVal } from '../../redux/slices/filterSlice'
import styles from './Search.module.scss'
import searchImg from '../../assets/img/search.svg'
import clearImg from '../../assets/img/clear.svg'

const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = React.useState<string>('')
	const inputRef = React.useRef<HTMLInputElement>(null)

	const onClickClear = () => {
		dispatch(setSearchVal(''))
		setValue('')
		inputRef.current?.focus()
	}

	const updateValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchVal(str))
		}, 500),
		[],
	)

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		updateValue(e.target.value)
	}

	return (
		<div className={styles.root}>
			<img className={styles.search} src={searchImg} alt='search-img' />
			<input
				onChange={onChangeInput}
				className={styles.input}
				placeholder='search...'
				type='text'
				value={value}
				ref={inputRef}
			/>
			{value && (
				<img
					onClick={onClickClear}
					className={styles.clear}
					src={clearImg}
					alt='clear-img'
				/>
			)}
		</div>
	)
}

export default Search
