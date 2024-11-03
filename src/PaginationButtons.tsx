import { Pagination } from "./types";

function PaginationButtons(
  { pagination, onPageChange }: {
    pagination: Pagination,
    onPageChange: (page: number) => void
  }
) {
  function handleClick(page: number) {
    if (page !== pagination.page) {
      onPageChange(page)
    }
  }

  if (pagination.maxPage) {
    const pages: JSX.Element[] = [];
    const startPage = Math.max(pagination.page - 2, 0)
    const lastPage = Math.min(startPage + 5, pagination.maxPage)

    for (let page = startPage; page < lastPage; page++) {
      pages.push(
        <button
          key={page}
          className={"join-item btn" + (
            page === pagination.page ? " btn-active" : ""
          )}
          onClick={() => handleClick(page)}
        >
          {page + 1}
        </button>)
    }
    return (<div className="join">
      {/* <button className="join-item btn" onClick={() => handleClick(0)}>First</button> */}
      {pages}
    </div>)
  } else {
    return null
  }
}

export default PaginationButtons