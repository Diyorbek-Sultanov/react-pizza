import { CartItemPropsT } from '../components/CartItem'

export const calcTotalPrice = (items: CartItemPropsT[]) => {
	return items.reduce((sum, item) => item.price * item.count + sum, 0)
}
