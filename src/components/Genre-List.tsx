"use client";

import { useState, useEffect, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
type data = {
  poster_path: string;
  id: number;
  results :string
};
type id = {
  genreID: number;
};
type page = {
  total_pages:number

}

const GenreList = ({ genreID }: id) => {
  const router = useRouter();
  const [movie, setMovie] = useState<data[]>([]);
  const [data, setData] = useState<page>({});
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [isLoading, setIsLoading] = useState(false)

  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTQ4NGFjM2VkOTBiOTliNWJhZDg5OGU4NjEzMmM3MSIsIm5iZiI6MTczNzk2MDA3OC4xMzUsInN1YiI6IjY3OTcyYThlNzAyZjQ5MmY0NzhmNDA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Har0MUDTTalUUSbdcR4CXRsSCIO30jGTEiNGDyyFUQ",
    },
  };
  const getMovie = async () => {
    console.log(genreID);
    
    try {
    setIsLoading(true)
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreID}%2C16&page=${currentPage}`,
        options,
      );
      const result = await response.json();
     
      setMovie(result.results);
      setData(result);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const page = data.total_pages;
  const pages = [];

  for (let i = 1; i <= page; i++) {
    pages.push(i);
  }
  const pages1 = pages.slice(
    currentPage >= 3 ? currentPage - 3 : currentPage - 1,
    currentPage + 4
  );
  useEffect(() => {
    getMovie();
  },[currentPage, genreID]);
  const handleChangePage = (page: number) => {
    // router.push(`/genres/?genresid${genreID}?page=${page}`)
    setCurrentPage(page); 
  };
  const handleMovieDetail = (movieID: number) => {
    router.push(`/movies/${movieID}`);
  };
  // console.log(movie)
  return (<>
    {isLoading == false ?(<div className="w-[69%]">
      <div> titles : {data.total_results} </div>
      <div className="grid grid-flow-col grid-rows-5 gap-10">
        {movie.map((el: data, index) => (
          <div
            key={index}
            className="h-[344px] overflow-hidden rounded-lg"
            onClick={() => handleMovieDetail(el.id)}
          >
            <img
              className="h-[70%] w-full"
              src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
            />
            <div className="h-[30%] bg-[#27272A] w-full"></div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        {pages1.map((page) => (
          <button
            key={page}
            className="text-white"
            onClick={() => handleChangePage(page)}
          >
            {page}
          </button>
        ))}
        <p>...</p>
        <button onClick={()=>(setCurrentPage(currentPage+1))}>Next</button>
      </div>
    </div>):null}
    </>
  );
};
export default GenreList;
