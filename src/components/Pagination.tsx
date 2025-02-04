'use client'

import { useRouter } from "next/navigation"

type Props ={
    currentPage : number,
    setCurrentPage : Function,
    data : ApiResponse
}
type ApiResponse = {
    total_pages : number,

}


const Pagination = ({currentPage, setCurrentPage, data}: Props) => {
  const router = useRouter()
    const page = data.total_pages;
    const pages = [];

    for (let i = 1; i <= page; i++) {
      pages.push(i);
    }
    const pages1 = pages.slice(
      currentPage >= 3 ? currentPage - 3 : currentPage - 1,
      currentPage + 4
    );
    const changePage = (page:number)=> {
      // router.push(`${window.location.pathname}?page=${page}`,{scroll:false})
      setCurrentPage(page)
    }
    return (
        <div className="flex gap-4 pt-4">
            {currentPage > 1 && (<button onClick={() => setCurrentPage(currentPage - 1)}> Previous</button>)}
            {pages1.map((page) => (
              <button
                key={page}
                className="text-white px-4 rounded-md py-2 py"
                style={{borderWidth:currentPage == page ? "2px": "none",
                  borderColor : currentPage == page ? "gray" : "none"
                }}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}
            <p>...</p>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </div>
    )
} 
export default Pagination