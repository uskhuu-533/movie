"use client";

import { useState, useEffect, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import Pagination from "./Pagination";
import Star from "./icon/Star";
import GenreLoading from "./loading/Genre-Movie-Loading";
import { getsearchMovie } from "@/utils/requests";

type Props = {
  searchValue: string;
};
type ApiResponse = {
  total_pages: number;
  results: Movie[];
  total_results: number;
};
type Movie = {
  poster_path: string;
  id: number;
  results: string;
  genre_ids: Array<Genres>;
  vote_average: number;
  title: string;
};
type Genres = {};

const SearchMovies = ({ searchValue }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse>({
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [genreID] = useQueryState<number[]>("genresid", {
    defaultValue: [],
    parse: (value) => value.split(",").map(Number),
    serialize: (array) => array.join(","),
  });
  const movie = data.results;

  useEffect(() => {
   const fetchMovie = async ()=>{
    try{
      setIsLoading(true)
      const result = await getsearchMovie(searchValue, currentPage)
      setData(result)
    }catch(error){
      console.error();
    }finally{
      setIsLoading(false)
    }
   }
    fetchMovie();
  }, [currentPage, searchValue]);

  const handleMovieDetail = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };

  return (
    <>
      <div className="lg:w-[70%] px-5 w-full pb-[50px]">
       {searchValue.length !== 0 ?(<>{isLoading == false ? (
          <>
            <div className=""> Results for "{searchValue}"</div>
            <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-10">
              {movie
                .filter((el: Movie) => {
                  if (genreID.length > 0) {
                    return genreID
                      ?.map((id) => el.genre_ids.includes(id))
                      .includes(true);
                  } else {
                    return movie;
                  }
                })
                .map((el: Movie, index) => (
                  <div
                    key={index}
                    className="overflow-hidden relative rounded-lg h-[430px]"
                    onClick={() => handleMovieDetail(el.id)}
                  >
                    <div className="w-full h-full absolute z-10 hover:bg-white/30"></div>
                    <img
                      className="h-[70%] w-full"
                      src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`}
                    />
                    <div className="h-[30%] bg-gray-500/30 w-full p-4">
                      <div>
                        <div className="flex gap-2">
                          <Star width="18px" height="20px" />
                          <div className="flex items-center">
                            {" "}
                            <p className="font-semibold">{el.vote_average}</p>
                            <p className="text-gray-400 text-sm">/10</p>
                          </div>
                        </div>
                        <p className="text-xl font-semibold line-clamp-2">
                          {el.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={data}
            />
          </>
        ) : (
          <GenreLoading />
        )}</>): <div className="w-full flex items-center justify-center h-[95px] border border-gray-500/50 rounded-md">No results found.</div>}
      </div>
    </>
  );
};
export default SearchMovies;
