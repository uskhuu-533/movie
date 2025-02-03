"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Right from "./icon/Right";
import GenreList from "./Genre-List";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { getGenre } from "@/utils/requests";
import SearchMovies from "./SearchMovies";

const inter = Inter({ subsets: ["latin"] });

interface Genre {
  id: number;
  name: string;
}

const GenrePage = () => {
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genreID, setGenreID] = useQueryState<number[]>("genresid", {
    defaultValue: [],
    parse: (value) => value.split(",").map(Number),
    serialize: (array) => array.join(","),
  });
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [Page, setPage] = useState("");
  const [value, setValue] = useQueryState("value")

  useEffect(() => {
    const path = window.location.pathname;
    console.log(path)
    if (path === "/search") {
      setPage("search");
    } else if (path === "/genres") {
      setPage("genres");
    } else {
      setPage("");
    }
  }, []);
  useEffect(() => {
    const fetchgetGenre = async () => {
          try {
            setIsLoading(true)
            const data = await getGenre();
            setGenres(data.genres); 
          } catch (error) {
            setError("");
            console.error( error);
          }finally{
         
            setIsLoading(false)
          }
        };
      
    fetchgetGenre();
  }, []);

  const toggleGenre = (id: number) => {
    const updatedGenres = genreID.includes(id)
      ? genreID.filter((genre) => genre !== id)
      : [...genreID, id];

    setGenreID(updatedGenres);
    setCurrentPage(1)
    router.push(`/genres?genresid=${updatedGenres.join("")}&page=1`);
  };

  return (
    <div className="w-full flex justify-center pb-10 text-white" >
      <div className="w-[1280px] mt-[150px] flex gap-4 @5xl:flex-col!" style={{ flexDirection : Page == "search" ? "row-reverse" : "row"}}>
        <div className="w-[28%]"> 
          <div className="text-3xl py-8 font-bold">Search Filter</div>
          <h2 className="text-2xl py-2 font-bold">Genres</h2>
          <p className="text-xl pb-5">See lists of movies by genre</p>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="flex flex-wrap gap-4 w-full">
              {genres.map((el: Genre, index) => (
                <div
                  onClick={() => toggleGenre(el.id)}
                  key={index}
                  className="border border-[#27272A] rounded-full pt-[2px] pr-[10px] pb-[2px] pl-[10px] gap-2 flex items-center cursor-pointer"
                  style={{
                    background: genreID.includes(el.id) ? "white" : "none",
                    color: genreID.includes(el.id) ? "black" : "white",
                  }}
                >
                  <p
                    className={`text-[14px] font-semibold ${inter.className}`}
                  >
                    {el.name}
                  </p>
                  <Right />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-full border border-[#27272A]"></div>
        {Page == "search" ? (<SearchMovies searchValue={value}/>):null}
       {Page == "genres" ? (<GenreList genreID={genreID} />): null}
      </div>
    </div>
  );
};

export default GenrePage;
