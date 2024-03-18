import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// import { useLocation, Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSearchParams } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

function PageBtnContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: { numOfPages, currPage },
  } = useAllJobsContext();
  console.log(numOfPages, currPage);
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  // console.log(pages);
  function handlePageChange(pageNumber) {
    searchParams.set("page", String(pageNumber));
    setSearchParams(searchParams);
  }

  function addPageButton({ pageNumber, activeClass }) {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  }

  function renderPageButtons() {
    const pageButtons = [];
    // First page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currPage === 1 })
    );
    // One before current page
    if (currPage !== 1 && currPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currPage - 1,
          activeClass: false,
        })
      );
    }
    if (currPage !== 1 && currPage !== numOfPages) {
      // current page
      pageButtons.push(
        addPageButton({
          pageNumber: currPage,
          activeClass: true,
        })
      );
    }
    // One after the current page
    if (currPage !== numOfPages && currPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currPage + 1,
          activeClass: false,
        })
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currPage === numOfPages,
      })
    );
    return pageButtons;
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
      <div className="btn-container">{renderPageButtons()}</div>
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
