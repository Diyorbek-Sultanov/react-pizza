import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaPropsT } from '../../components/Pizza'

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface IPizza {
	pizzas: PizzaPropsT[]
	status: Status
}

export type SearchParamsT = {
	categoryIdd: string
	sortd: string
	order: string
	search: string
	currentPage: number
}

export const fetchPizzas = createAsyncThunk<PizzaPropsT[], SearchParamsT>(
	'pizza/fetchPizzaStatus',
	async params => {
		const { categoryIdd, sortd, order, search, currentPage } = params
		const { data } = await axios.get<PizzaPropsT[]>(
			`https://63b657a158084a7af3af856b.mockapi.io/api/pizzas/items?p=${currentPage}&limit=4&${categoryIdd}&sort=${sortd}&${search}&order=${order}`,
		)
		return data
	},
)

const initialState: IPizza = {
	pizzas: [],
	status: Status.LOADING,
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas(state, action) {
			state.pizzas = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING
			state.pizzas = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = Status.SUCCESS
			state.pizzas = action.payload
		})
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR
			state.pizzas = []
		})
	},
})

export const { setPizzas } = pizzaSlice.actions
export default pizzaSlice.reducer
