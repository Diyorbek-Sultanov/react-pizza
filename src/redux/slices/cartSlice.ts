import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItemPropsT } from '../../components/CartItem'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getFromLS'
import { RootState } from '../store'

interface ICart {
	totalPrice: number
	items: CartItemPropsT[]
}

const { items, totalPrice } = getCartFromLS()

const initialState: ICart = {
	totalPrice,
	items,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItemPropsT>) {
			const findItem = state.items.find(item => item.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = calcTotalPrice(state.items)
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(item => item.id === action.payload)
			if (findItem) {
				findItem.count--
			}
			state.totalPrice = state.items.reduce((sum, item) => {
				return item.price * item.count + sum
			}, 0)
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(item => item.id !== action.payload)
		},
		clearCart(state) {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const cartSelector = (state: RootState) => state.cart

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions
export default cartSlice.reducer
