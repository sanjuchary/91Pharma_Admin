import { range } from "../../helpers/common/range";

const Pagination = (props) => {
  return (
    <div className="pagination">
      <div className="pagination-item pe-2">
        <button
          className="btn btn-sm common__pagination__button"
          onClick={() => props.handlePage(1)}
          disabled={props.page === 1}
        >
          <i className="bx bx-chevron-left" />
        </button>
      </div>
      {range(1, props.total_pages).map((page, key) => (
        <div className="pagination-item mx-1" key={key}>
          <span
            className={` 
                btn btn-sm 
                ${page === props.page ? "btn-dark" : " btn-white"}
            `}
            onClick={() => props.handlePage(page)}
          >
            {page}
          </span>
        </div>
      ))}
      <div className="pagination-item ps-2">
        <button
          className="btn btn-sm common__pagination__button"
          onClick={() => props.handlePage(props.page + 1)}
          disabled={props.page === props.total_pages}
        >
          <i className="bx bx-chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
