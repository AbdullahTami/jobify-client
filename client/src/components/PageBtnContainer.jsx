import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSearchParams } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

function PageBtnContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: {
      data: { numOfPages, currPage },
    },
  } = useAllJobsContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  // console.log(pages);
  function handlePageChange(pageNumber) {
    searchParams.set("page", String(pageNumber));
    setSearchParams(searchParams);
  }
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${pageNumber === currPage && "active"}`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;
