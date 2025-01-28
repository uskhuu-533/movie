"use client"



  
import { useState, useEffect } from "react";
type data = {
    poster_path:string
}
type id = {
    genreId : number
}

const FilterList = ({genreId}:id) => {
   
    const [movie, setMovie] = useState<data[]>([])
    const [data, setData] = useState ({})
    const [currentPage, setCurrentPage] = useState(1)
   
    const options: object = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
        },
      };
      const getMovie = async () => {
        try {
            const response1 =await 
            fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${currentPage}`,
            options
          );
          const result = await response.json();
          const result2 =await response1.json()
          if ( genreId.length === 0){
            setMovie(result2.results)
          }else{
            setMovie(result.results)
          }
        
          setData(result2)
         
        } catch (error) {
          console.log(error);
        }
      };
      const page = data.total_pages
      const pages = []
      for (let i = 1; i<=page;i++){
        pages.push(i)
      }
      const pages1 = pages.slice(currentPage>=3 ? currentPage-3 : currentPage-1 , currentPage+4)
      useEffect(() => {
        getMovie();
      });
      const nextPage = ()=> {
        setCurrentPage(currentPage +1)
      }
   
    return(
        <div className="w-[69%]">
            <div>{movie.total_results} titles</div>
            <div className="grid grid-flow-col grid-rows-5 gap-10">
                {movie.map((el:data, index)=>(
                    <div key={index} className="h-[344px] overflow-hidden rounded-lg">
                        <img className="h-[70%] w-full" src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}/>
                        <div className="h-[30%] bg-[#27272A] w-full"></div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                {pages1.map((i, index)=>(
                    <button key={i} className="text-white" onClick={()=>(setCurrentPage(i))}>{i}</button>
                ))}<p>...</p>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}
export default FilterList