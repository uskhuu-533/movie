

"use client"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Dispatch, useEffect, useState } from "react"
import Right from "./icon/Right";

import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import SearchMovies from "./SearchMovies";

;
type data = {
    id: number,
    name: string,
  
  };
type Props = {
  genreID : number,
  value :string
 

}
const SearchResultPage = () => {
  const router = useRouter();
      const [genres, setGenre] = useState<data[]>([]);
      const [idLoading, setIsloading] = useState(false);
      const [value, setValue] = useQueryState("value", {defaultValue:""})
      // const [genreID , setGenreID] = useQueryState("genresid", parseAsInteger)
      const [genreID, setGenreID] = useQueryState("genresid", {
        defaultValue: [],
        parse: (value) => value.split(",").map(Number),
        serialize: (array) => array.join(","),
      });
  
      const options: object = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
        },
      };
      const getGenres = async () => {
        try {
          setIsloading(true)
          const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options
          );
          const result = await response.json();
          setGenre(result.genres);
          setIsloading(false)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getGenres();
      },[]);
      const toggleGenre = (id: number) => {
        const updatedGenres = genreID.includes(id)
          ? genreID.filter((genre) => genre !== id)
          : [...genreID, id];
    
        setGenreID(updatedGenres);
        router.push(`/genres?genresid=${updatedGenres.join("")}&page=1`);
      };
    return (
        <div className="w-full flex justify-center pb-10 text-white">
        <div className="w-[1280px] mt-[150px] w-max-[1280px] flex gap-4"> 
        <SearchMovies searchValue={value} />
        <div className="h-full border border-[#27272A]"></div>
            <div className="w-[28%]">
                <div>Search Filte</div>
                <h2>Genres</h2>
                <p>See lists of movies by genre</p>
                {idLoading == false && (<div className="flex flex-wrap gap-4 w-full">
                {genres.map((el: data, index) => (
                <div
                onClick={()=>toggleGenre(el.id)}
                  key={index}
                  className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center"
                  style={{
                    background: genreID.includes(el.id) ? "white" : "none",
                    color: genreID.includes(el.id) ? "black" : "white",
                  }}
                >
                  <p
                    className={`text-[14px] text-white font-semibold ${inter.className}`}
                  >
                    {el.name}
                  </p>
                  <Right />
                </div>
              ))}
                </div>)}
            </div>
            
          </div>
     
        </div>
       );
}
export default SearchResultPage
