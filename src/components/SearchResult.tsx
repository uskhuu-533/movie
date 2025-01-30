import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type props ={
    searchValue : string
}
type data = {
    title : string,
    release_date : string,
    vote_average : number
}
const SearchResult = ({searchValue}:props) => {
    const router = useRouter()
    const [searchResult, setSearchResult] = useState<data[]>([])
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
        },
      };
    
      useEffect(() => {
        const getGenres = async () => {
          try {
            const response =await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`, options)
            const result = await response.json();
            console.log()
            setSearchResult(result.results);
          } catch (error) {
            console.error("Error fetching genres:", error);
          }
        };
        getGenres();
      }, [searchValue]);
      searchResult.length=5
      const handleMovieClick = (movieID: number) => {
        router.push(`/movies/${movieID}`);
      };
    return(
        <div className="w-full  border border-[#27272A] bg-[#09090B] top-10 p-4 rounded-lg flex-col">
           <div className="w-full h-[90%] flex flex-col gap-2 p-4">
             {searchResult.map((movie:data, index)=>(
                <div onClick={() => handleMovieClick(movie.id)} className="w-full h-[116px] border-b border-b-[#27272A]  flex justify-between" key={index}>
                    <div className="w-[80%] flex gap-x-2">
                        <img className="h-[95%] w-[20%] rounded-md" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <div>
                        <p>{movie.title}</p>
                        <div className="flex">
                            <p>{movie.vote_average}</p>
                            <p>/10</p>
                        </div>
                        <p className="mt-4">{movie.release_date}</p>
                    </div>
                    </div>
                    <div className="h-full flex items-end pr-4">
                        <div className="w-full h-[50%] flex items-center">
                        <p>see more</p>
                        </div>
                        </div>
                </div>
            ))}
            </div>
            <div className="w-full h-1/10 px-4">
            <div>
                See all results for "{searchValue}"
            </div>
            </div>
        </div>
    )
}
export default SearchResult