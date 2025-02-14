"use client";

type Props = {
  currentPage: number;
  setCurrentPage: (_currentPage: number) => void;
  data: Response | null;
};
type Response = {
  total_pages: number | undefined;
};

const Pagination = ({ currentPage, setCurrentPage, data }: Props) => {

  const page = data?.total_pages;
  const pages = [];
  if (page) {
    for (let i = 1; i <= page; i++) {
      pages.push(i);
    }
    const pages1 = pages.slice(
      currentPage >= 2 ? currentPage - 2 : currentPage - 1,
      currentPage >= 498 ? currentPage : currentPage + 1
    );
    const changePage = (page: number) => {
      setCurrentPage(page);
    };
    const lastPage = () => {
      {
        page >= 500 ? setCurrentPage(500) : setCurrentPage(page);
      }
    };
    if (page > 500) {
      pages.length = 500;
    }
    return (
      <div className="flex md:gap-4 sm:gap-2 gap-1 text-sm  pt-4 items-center">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}
        {currentPage > 2 && (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            <p>...</p>
          </>
        )}
        {pages1.map((page) => (
          <button
            key={page}
            className="dark:text-white sm:px-4 px-3 rounded-md sm:py-2 py-[4px] py"
            style={{
              borderWidth: currentPage == page ? "2px" : "none",
              borderColor: currentPage == page ? "gray" : "none",
            }}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < page - 4 && (
          <>
            <p>...</p>
            <button onClick={() => lastPage()}>
              {page >= 500 ? 500 : page}
            </button>{" "}
          </>
        )}
        {currentPage !== 500 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    );
  }
};
export default Pagination;
