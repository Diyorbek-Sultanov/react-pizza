import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SortEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type SortT = {
	name: string
	sortProp: SortEnum
}

interface IFilter {
	categoryId: number
	sort: SortT
	currentPage: number
	searchVal: string
	order: string
}

const initialState: IFilter = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProp: SortEnum.RATING_DESC,
	},
	currentPage: 1,
	searchVal: '',
	order: 'desc',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSortType(state, action: PayloadAction<SortT>) {
			state.sort = action.payload
		},
		setPaginationId(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setSearchVal(state, action: PayloadAction<string>) {
			state.searchVal = action.payload
		},
		setFilterParams(state, action: PayloadAction<IFilter>) {
			if (Object.keys(action.payload).length) {
				state.sort = action.payload.sort
				state.categoryId = Number(action.payload.categoryId)
				state.currentPage = Number(action.payload.currentPage)
			} else {
				state.sort = {
					name: 'популярности',
					sortProp: SortEnum.RATING_DESC,
				}
				state.categoryId = 0
				state.currentPage = 1
			}
		},
	},
})

export const {
	setCategoryId,
	setSortType,
	setFilterParams,
	setPaginationId,
	setSearchVal,
} = filterSlice.actions
export default filterSlice.reducer
