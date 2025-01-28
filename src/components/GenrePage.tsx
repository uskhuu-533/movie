"use client"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Dispatch, useEffect, useState } from "react"
import Header from "./Header";
import Footer from "./Footer";
import FilterList from "./Filter-List";
import Right from "./icon/Right";
import exp from "constants";
;
type data = {
    id: number,
    name: string,
  
  };
  type id = {
    genreId : number,
    setId : Function
}
const GenrePage = ({genreId, setId}:id) => {
      const [genre, setGenre] = useState<data[]>([]);
      
     
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
          const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options
          );
          const result = await response.json();
          setGenre(result.genres);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getGenres();
      });
      const filterMovie =(id:number) => {
        if(genreId == id ){
            setId("")
        }else{
            setId(id)
        }
        console.log(genreId)
      } 
    return (
        <div className="w-full flex justify-center pb-10 text-white">
        <div className="w-[1280px] mt-[150px] w-max-[1280px] flex gap-4"> 
            <div className="w-[28%]">
                <div>Search Filter</div>
                <h2>Genres</h2>
                <p>See lists of movies by genre</p>
                <div className="flex flex-wrap gap-4 w-full">
                {genre.map((el: data, index) => (
                <div
                onClick={()=>filterMovie(el.id)}
                  key={index}
                  className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center"
                  style={{background:el.id == genreId ? "while" : "none",
                    color: el.id == genreId ? "black" : "white"
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
                </div>
            </div>
            <div className="h-full border border-[#27272A]"></div>
          <FilterList genreId={genreId}/></div>
     
        </div>
       );
}
export default GenrePage
