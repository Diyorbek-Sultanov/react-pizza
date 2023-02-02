import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationPropsT = {
	currentPage: number
	onClickPagination: (i: number) => void
}

const Pagination: React.FC<PaginationPropsT> = ({
	currentPage,
	onClickPagination,
}) => {
	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel='...'
			nextLabel='>'
			onPageChange={e => onClickPagination(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			previousLabel='<'
		/>
	)
}

export default Pagination
