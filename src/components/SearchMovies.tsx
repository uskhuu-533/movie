"use client";

import { useState, useEffect, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { clear } from "node:console";
import Pagination from "./Pagination";
import Star from "./icon/Star";

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
  vote_average : number;
  title : string
};
type Genres = {}

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
  const [genreID, setGenreID] = useQueryState<number[]>("genresid", {
    defaultValue: [],
    parse: (value) => value.split(",").map(Number),
    serialize: (array) => array.join(","),
  });
  const [totalResult, setResults] = useState()
  // console.log(genreID);

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
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en&page=${currentPage}`,
        options
      );
      const result = await response.json();

      setData(result);

      
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  };

  const movie = data.results;


  useEffect(() => {
    getMovie();
  }, [currentPage, searchValue]);
  const handleChangePage = (page: number) => {
    // router.push(`/genres/?genresid${genreID}?page=${page}`)
    setCurrentPage(page);
  };
  const handleMovieDetail = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  
  };
  // console.log(movie)
  return (
    <>
      {isLoading == false ? (
        <div className="w-full relative mb-[200px]">
          <div className="py-5"> titles : {}</div>
          <div className="grid grid-flow-row grid-cols-4 gap-10 h-full">
            {movie
              .filter((el: Movie) => {
                if (genreID.length > 0 ) {
                  return genreID?.map((id)=>el.genre_ids.includes(id)).includes(true)
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
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={data}/>
        </div>
      ) : null}
      
    </>
  );
};
export default SearchMovies;
