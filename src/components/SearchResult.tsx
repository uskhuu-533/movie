import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleClientScriptLoad } from "next/script";
import { useQueryState } from "nuqs";
import Star from "./icon/Star";
import SeeMore from "./icon/SeeMore";
type props ={
    searchValue : string
}
type data = {
    title : string,
    release_date : string,
    vote_average : number,
    id : number,
    poster_path : string
}
const SearchResult = ({searchValue}:props) => {
    const router = useRouter()
    const [searchResult, setSearchResult] = useState<data[]>([])
    const [value, setValue] = useQueryState("value")
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
      const handleJumpResults =()=> {
        router.push(`/search/?value=${searchValue}&page=1`)
      }
    return(
        <div className="w-full  border border-[#27272A] dark:bg-[#09090B] bg-white top-10 p-2 rounded-lg flex-col">
           <div className="w-full h-[90%] flex flex-col gap-2 p-4">
             {searchResult.map((movie:data, index)=>(
                <div onClick={() => handleMovieClick(movie.id)} className="w-full h-[116px] border-b border-b-gray-500/30  item-center pb-2 flex justify-between hover:bg-white/20  " key={index}>
                    <div className="w-[80%] flex gap-x-2">
                        <img className="h-[100%] w-[20%] rounded-md" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <div>
                        <p>{movie.title}</p>
                        <div className="flex gap-1">
                          <Star width="18px" height="20px"/>
                          <div className="flex items-center">
                            <p className="font-semibold">{Math.round((movie.vote_average)*10)/10}</p>
                            <p className="text-gray-400 text-sm">/10</p>
                            </div>
                        </div>
                        <p className="mt-4">{movie.release_date}</p>
                    </div>
                    </div>
                    <div className="h-full flex items-end pr-4">
                        <div className="w-full h-[50%] flex gap-1 items-center">
                        <p>see more</p>
                        <SeeMore />
                        </div>
                        </div>
                </div>
            ))}
            </div>
            <div className="w-full h-1/10 px-4">
            <div onClick={handleJumpResults}>
                See all results for "{searchValue}"
            </div>
            </div>
        </div>
    )
}
export default SearchResult