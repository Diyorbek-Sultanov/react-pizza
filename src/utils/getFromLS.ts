import { CartItemPropsT } from '../components/CartItem'
import { calcTotalPrice } from './calcTotalPrice'

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart')
	const items: CartItemPropsT[] = data ? JSON.parse(data) : []
	const totalPrice: number = calcTotalPrice(items)

	return { items, totalPrice }
}
