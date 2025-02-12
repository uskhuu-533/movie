"use client";



type Props = {
  currentPage: number;
  setCurrentPage: Function;
  data:Response | null
};
type Response = {
  total_pages: number | undefined;
};

const Pagination = ({ currentPage, setCurrentPage, data }: Props) => {
  console.log(currentPage);
  

  const page = data?.total_pages;
  const pages = [];
if(page){
  for (let i = 1; i <= page; i++) {
    pages.push(i);
  }
  const pages1 = pages.slice(
    currentPage >= 2 ? currentPage - 2 : currentPage - 1,
    currentPage >=498  ? currentPage : currentPage + 2
  );
  const changePage = (page: number) => {
    setCurrentPage(page);
  };
  const lastPage = () => {
    {page >= 500 ? setCurrentPage(500) : setCurrentPage(page)}
  }
  if(page > 500){
    pages.length = 500
  }
  return (
    <div className="flex gap-4  pt-4 items-center">
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          
          Previous
        </button>
      )}
    {currentPage > 2 && (<><button onClick={()=>setCurrentPage(1)}>1</button>
    <p>...</p>
    
    </>)}
      {pages1.map((page) => (
        <button
          key={page}
          className="dark:text-white px-4 rounded-md py-2 py"
          style={{
            borderWidth: currentPage == page ? "2px" : "none",
            borderColor: currentPage == page ? "gray" : "none",
          }}
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < page-4 && (
        <>
          <p>...</p>
          <button onClick={() => lastPage()}>{page >= 500 ? 500 : page}</button>{" "}
        </>
      )}{currentPage !== 500 && ( <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>)}
    </div>
  );}
};
export default Pagination;
