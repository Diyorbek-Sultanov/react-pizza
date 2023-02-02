import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

type pizzaT = {
	imageUrl: string
	title: string
	price: number
}

const PizzaDetail: React.FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [data, setData] = React.useState<pizzaT>()

	React.useEffect(() => {
		const fetchPizzaById = async () => {
			try {
				const { data } = await axios.get(
					`https://63b657a158084a7af3af856b.mockapi.io/api/pizzas/items/${id}`,
				)

				setData(data)
			} catch (error) {
				alert('не удалось найти пиццы')
				navigate('/')
				throw new Error(`server is error: ${error}`)
			}
		}
		fetchPizzaById()
	}, [])

	if (!data) {
		return <>Загрузка...</>
	}

	return (
		<div className='container'>
			<img src={data.imageUrl} alt='pizza' />
			<h2>{data.title}</h2>
			<h4>{data.price} ₽</h4>
		</div>
	)
}

export default PizzaDetail
